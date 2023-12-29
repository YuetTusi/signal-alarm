import mapConnectedIcon from '@/assets/image/map-connected.png';
import mapWarnIcon from '@/assets/image/map-warn.png';
import mapOfflineIcon from '@/assets/image/map-offline.png';
import L from 'leaflet';
import { FC, useEffect, useState } from 'react';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import { Button, Form, Spin, Select, Switch, message } from 'antd';
import { useModel } from '@/model';
import { useUnmount, useSubscribe, usePhoneAlarm } from '@/hook';
import { request } from '@/utility/http';
import { Zone } from '@/schema/zone';
import { DeviceState } from '@/schema/com-device';
import { Legend } from './legend';
import { RadarInfo } from './radar-info';
import {
    disposeAllMarker, getColor, initMap,
    loadCircle, loadMap
} from './util';
import { BiboBox, MaskBox } from './styled/box';
import { MarkerOptionsEx, SearchFormValue } from './prop';

const { useForm, Item } = Form;
const { Option } = Select;
let map: L.Map | null = null;
let devices: L.Marker[] = []; //设备坐标点
let circles: {
    deviceId: string,
    circle: L.Circle
}[] = [];//效果圆环
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
    const {
        zoneList,
        phoneAlarmData,
        devicesOnMap,
        alarmsOfDevice,
        clearPhoneAlarmData,
        queryZoneList,
        queryDevicesOnMap,
        queryDeviceTopAlarms
    } = useModel(state => ({
        zoneList: state.zoneList,
        phoneAlarmData: state.phoneAlarmData,
        devicesOnMap: state.devicesOnMap,
        alarmsOfDevice: state.alarmsOfDevice,
        clearPhoneAlarmData: state.clearPhoneAlarmData,
        queryZoneList: state.queryZoneList,
        queryDevicesOnMap: state.queryDevicesOnMap,
        queryDeviceTopAlarms: state.queryDeviceTopAlarms
    }));
    const alarms = usePhoneAlarm(phoneAlarmData);

    useEffect(() => {
        queryZoneList();
    }, []);

    /**
     * 间隔n秒查询信号环
     */
    const queryDeviceHandle = () => {
        const tasks = devices
            .filter(item => (item.options as MarkerOptionsEx).status === DeviceState.Normal)
            .map(item => {
                const { deviceId } = item.options as MarkerOptionsEx;
                if (map !== null) {
                    const willRemove = circles.filter(i => i.deviceId === deviceId);
                    for (let i = 0; i < willRemove.length; i++) {
                        willRemove[i].circle.removeFrom(map);
                    }
                }
                return queryDeviceTopAlarms(deviceId);
            });
        Promise.allSettled(tasks);
    };

    useSubscribe('query-each-20', queryDeviceHandle);

    useEffect(() => {

        if (map === null || alarmsOfDevice === undefined) {
            return;
        }

        for (let i = 0; i < devices.length; i++) {
            const { deviceId } = devices[i].options as MarkerOptionsEx;
            const { lat, lng } = devices[i].getLatLng();
            const alarms = alarmsOfDevice[deviceId];

            if (alarms && alarms.length > 0) {
                //信号环
                if (map !== null) {
                    //更新前浮空环
                    circles.forEach(circle => circle.circle.removeFrom(map!));
                }
                circles = alarms.map(item => {
                    const circle = loadCircle(devices[i].getLatLng(), getColor(item.protocolType!), item.radius);
                    circle.addTo(map!);
                    return {
                        deviceId,
                        circle
                    };
                });

                //更换Icon
                const nextMarker = L.marker([
                    lat, lng
                ], {
                    icon: warnIcon,
                    title: (devices[i].options as MarkerOptionsEx).title,
                    deviceId: (devices[i].options as MarkerOptionsEx).deviceId,
                    siteName: (devices[i].options as MarkerOptionsEx).siteName,
                    status: (devices[i].options as MarkerOptionsEx).status,
                    hasAlarm: true
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
        if (map !== null) {
            map.setZoom(14);
        }
    };

    useSubscribe('alarm-clean', () => {
        //每天0时清空报警状态
        bindDeviceOnMap();
    });

    useEffect(() => {
        //地图上标记点变化，更新相关设备
        bindDeviceOnMap();
    }, [devicesOnMap]);

    useEffect(() => {
        if (zoneList.length > 0) {
            (async () => {
                setLoading(true);
                const [first] = zoneList;
                formRef.setFieldValue('zone', first.id);
                try {
                    const res = await request.get<Zone>(`/sys/area/get-area-info/${first.id}`);
                    if (res !== null && res.code === 200) {
                        if (map !== null) {
                            initMap('bibo', map);
                        }
                        map = loadMap('bibo', res.data.areaBg);
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
        circles = [];
        if (map !== null) {
            initMap('bibo', map);
            map = null;
        }
    });

    /**
     * 区域Change
     */
    const onZoneChange = async (value: number) => {
        setLoading(true);
        devices = [];
        circles = [];
        clearPhoneAlarmData();
        try {
            const res = await request.get<Zone>(`/sys/area/get-area-info/${value}`);
            if (res !== null && res.code === 200) {
                if (map !== null) {
                    initMap('bibo', map);
                }
                map = loadMap('bibo', res.data.areaBg);
                map?.setZoom(14);
                await queryDevicesOnMap(value.toString());
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