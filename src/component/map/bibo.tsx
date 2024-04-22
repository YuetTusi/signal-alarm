import mapWarnIcon from '@/assets/image/map-warn.png';
import mapOfflineIcon from '@/assets/image/map-offline.png';
import mapConnectedIcon from '@/assets/image/map-connected.png';
import { chunk, throttle } from 'lodash';
import L from 'leaflet';
import { FC, useEffect, useRef, useState } from 'react';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import { Button, Form, Spin, Select, Switch, message } from 'antd';
import { useModel, useShallow } from '@/model';
import { useUnmount, useSubscribe, usePhoneAlarm } from '@/hook';
import { request } from '@/utility/http';
import { Zone } from '@/schema/zone';
import { Point } from '@/schema/point';
import { DeviceState } from '@/schema/com-device';
import { Legend } from './legend';
import { RadarInfo } from './radar-info';
import {
    disposeAllMarker, initMap,
    loadMap, pointToMarker, toMakerGroup
} from './util';
import { renderTemp } from './template';
import { BiboBox, MaskBox } from './styled/box';
import { MarkerOptionsEx, SearchFormValue } from './prop';

const { useForm, Item } = Form;
const { Option } = Select;
let map: L.Map | null = null;
let devices: L.Marker[] = []; //设备点
let p: L.Marker[] = [];//定位坐标点

const defaultIcon = new L.Icon({
    iconUrl: mapConnectedIcon,
    iconAnchor: [21, 59]
});//默认图标
const warnIcon = new L.Icon({
    iconUrl: mapWarnIcon,
    iconAnchor: [21, 59]
});//报警图标
const offlineIcon = new L.Icon({
    iconUrl: mapOfflineIcon,
    iconAnchor: [21, 59]
});//离线图标

/**
 * 设备报警（地图版本）
 */
const Bibo: FC<{}> = () => {

    const [formRef] = useForm<SearchFormValue>();
    const [loading, setLoading] = useState<boolean>(false);
    const [radar, openRadar] = useState<boolean>(false);
    const [deviceId, setDeviceId] = useState<string>('');
    const [legendVisible, setLegendVisible] = useState<boolean>(false);
    const currentAreaId = useRef<number>(0);
    const {
        zoneList,
        phoneAlarmData,
        points,
        devicesOnMap,
        alarmsOfDevice,
        // appendPoint,
        removePointOverTime,
        clearPhoneAlarmData,
        queryZoneList,
        queryDevicesOnMap,
        queryDeviceTopAlarms
    } = useModel(useShallow(state => ({
        zoneList: state.zoneList,
        phoneAlarmData: state.phoneAlarmData,
        points: state.points,
        devicesOnMap: state.devicesOnMap,
        alarmsOfDevice: state.alarmsOfDevice,
        // appendPoint: state.appendPoint,
        removePointOverTime: state.removePointOverTime,
        clearPhoneAlarmData: state.clearPhoneAlarmData,
        queryZoneList: state.queryZoneList,
        queryDevicesOnMap: state.queryDevicesOnMap,
        queryDeviceTopAlarms: state.queryDeviceTopAlarms
    })));
    const alarms = usePhoneAlarm(phoneAlarmData);

    useEffect(() => {
        queryZoneList();
    }, []);

    useEffect(() => {

        if (map === null || alarmsOfDevice === undefined) {
            return;
        }

        for (let i = 0; i < devices.length; i++) {
            const { deviceId } = devices[i].options as MarkerOptionsEx;
            const { lat, lng } = devices[i].getLatLng();
            const alarms = alarmsOfDevice[deviceId];

            if (alarms && alarms.length > 0) {
                //更换Icon
                const nextMarker = L.marker([lat, lng], {
                    hasAlarm: true,
                    icon: warnIcon,
                    title: (devices[i].options as MarkerOptionsEx).title,
                    deviceId: (devices[i].options as MarkerOptionsEx).deviceId,
                    siteName: (devices[i].options as MarkerOptionsEx).siteName,
                    status: (devices[i].options as MarkerOptionsEx).status
                } as MarkerOptionsEx);
                nextMarker.on('click', (e) => {
                    const { deviceId, hasAlarm } = e.target.options;
                    if (hasAlarm) {
                        setDeviceId(deviceId);
                        openRadar(true);
                    } else {
                        message.destroy();
                        message.info('暂无告警消息');
                    }
                });
                map.removeLayer(devices[i]);
                devices[i] = nextMarker.addTo(map);
            } else {
                (devices[i].options as MarkerOptionsEx).status === DeviceState.Normal
                    ? devices[i].setIcon(defaultIcon)
                    : devices[i].setIcon(offlineIcon);
                (devices[i].options as MarkerOptionsEx).hasAlarm = false;
            }
        }
    }, [alarmsOfDevice]);

    /**
     * 绑定地图上设备
     */
    const bindDeviceOnMap = () => {

        devices = devicesOnMap
            .map(item => {
                const mark = L.marker([
                    item.lat, item.lon
                ], {
                    icon: item.status === DeviceState.Normal ? defaultIcon : offlineIcon,
                    title: item.deviceName,
                    deviceId: item.deviceId,
                    siteName: item.siteName,
                    status: item.status,
                    hasAlarm: false
                } as MarkerOptionsEx);
                if (item.status === DeviceState.Normal) {
                    queryDeviceTopAlarms(item.deviceId);
                }
                mark.on('click', (e) => {
                    const { deviceId, hasAlarm } = e.target.options;
                    if (hasAlarm) {
                        setDeviceId(deviceId);
                        openRadar(true);
                    } else {
                        message.destroy();
                        message.info('暂无告警消息');
                    }
                });
                if (map !== null) {
                    mark.addTo(map);
                }
                return mark;
            });
        // if (map !== null) {
        //     map.setZoom(14);
        // }
    };

    useSubscribe('query-each-5', () => {
        if (map === null) {
            return;
        }
        removePointOverTime(60);
    });

    useSubscribe('alarm-clean', () => {
        //每天0时清空报警状态
        bindDeviceOnMap();
    });

    useEffect(() => {
        //地图上标记点变化，更新相关设备
        bindDeviceOnMap();
    }, [devicesOnMap]);

    useEffect(throttle(() => {
        if (map === null) {
            return;
        }

        //过滤掉不是当前区域的点
        const thisAreaPoints = points.filter(i => i.areaId === currentAreaId.current);
        // console.log(`Points:${points.length}, This Area:${thisAreaPoints.length}`);

        p.forEach(m => map!.removeLayer(m));
        p = pointToMarker(thisAreaPoints);
        p.forEach(m => {
            const details = points.reduce((acc, current) => {
                const same = m.getLatLng().equals([
                    Number.parseFloat(current.lat),
                    Number.parseFloat(current.lon)
                ]);
                if (same) {
                    acc.push(current);
                }
                return acc;
            }, [] as Point[]);
            m.bindTooltip(renderTemp(details));
        });
        setTimeout(() => {
            //拆分加载点
            chunk(p, 32).forEach(s => toMakerGroup(s).addTo(map!));
            // toMakerGroup(p).addTo(map!);
        }, 0);
    }, 1000), [points]);

    useEffect(() => {
        if (zoneList.length > 0) {
            (async () => {
                setLoading(true);
                const [first] = zoneList;
                currentAreaId.current = first.id;
                formRef.setFieldValue('zone', first.id);
                try {
                    const res = await request.get<Zone>(`/sys/area/get-area-info/${first.id}`);
                    if (res !== null && res.code === 200) {
                        const { areaBg, areaHeight, areaWidth } = res.data;
                        if (map !== null) {
                            initMap('bibo', map);
                        }
                        map = loadMap('bibo', areaBg, areaWidth, areaHeight);
                        await queryDevicesOnMap(first.id.toString());
                    }
                } catch (error) {
                    console.warn(error);
                } finally {
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
            })();
        }
    }, [zoneList]);

    useUnmount(() => {
        disposeAllMarker(devices, map);
        devices = [];
        disposeAllMarker(p, map);
        p = [];
        if (map !== null) {
            initMap('bibo', map);
            map = null;
        }
    });

    /**
     * 区域Change
     */
    const onZoneChange = async (zoneId: number) => {
        setLoading(true);
        devices = [];
        currentAreaId.current = zoneId;
        clearPhoneAlarmData();
        try {
            const res = await request.get<Zone>(`/sys/area/get-area-info/${zoneId}`);
            if (res !== null && res.code === 200) {
                const { areaBg, areaHeight, areaWidth } = res.data;
                if (map !== null) {
                    initMap('bibo', map);
                }
                map = loadMap('bibo', areaBg, areaWidth, areaHeight);
                // map?.setZoom(14);
                await queryDevicesOnMap(zoneId.toString());
            }
        } catch (error) {
            console.warn(error);
        } finally {
            setLoading(false);
        }
    };

    const bindZoneOption = () =>
        zoneList.map(item => <Option
            value={item.id}
            key={`ZO_${item.id}`}>
            {item.areaName}
        </Option>);

    return <BiboBox>
        <Legend visible={legendVisible} />
        <div className="d-box">
            <span>
                <Form form={formRef} layout="inline">
                    <Item
                        name="zone"
                        label="涉密区域">
                        <Select
                            onChange={onZoneChange}
                            disabled={loading}
                            style={{ width: '200px' }}>
                            {bindZoneOption()}
                        </Select>
                    </Item>
                    <Item>
                        <Button
                            onClick={() => queryZoneList()}
                            style={{ padding: 0 }}
                            type="link"
                            size="small"
                            title="刷新涉密区域">
                            <SyncOutlined />
                        </Button>
                    </Item>
                    <Item label="颜色">
                        <Switch
                            onChange={(checked) => {
                                const $div = document.querySelector('#bibo');
                                if ($div) {
                                    checked
                                        ? $div.classList.add('dark-blue-filter')
                                        : $div.classList.remove('dark-blue-filter');
                                }
                            }}
                            checkedChildren="暗"
                            unCheckedChildren="亮" />
                    </Item>
                </Form>
            </span>
            <span>
                <Button
                    onClick={() => setLegendVisible(prev => !prev)}
                    type="primary">
                    {legendVisible ? '关闭图例' : '信号图例'}
                </Button>
            </span>
        </div>
        <div className="map-box" id="bibo">

        </div>
        <RadarInfo
            open={radar}
            data={alarms}
            deviceId={deviceId}
            onClose={() => {
                openRadar(false);
            }} />

        {/* <RadarDemo
            open={radar}
            data={alarms}
            deviceId={deviceId}
            onClose={() => {
                openRadar(false);
            }}
        /> */}
        <MaskBox style={{ display: loading ? 'flex' : 'none' }}>
            <Spin
                tip="加载中"
                style={{
                    color: '#b4cdff'
                }} />
        </MaskBox>
    </BiboBox>
};

export { Bibo };