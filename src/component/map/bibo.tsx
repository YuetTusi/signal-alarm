import mapConnectedIcon from '@/assets/image/map-connected.png';
import mapWarnIcon from '@/assets/image/map-warn.png';
import L from 'leaflet';
import { FC, useEffect, useState, useCallback } from 'react';
import { Button, Form, Spin, Select, message } from 'antd';
import { useModel } from '@/model';
import { useUnmount, useSubscribe } from '@/hook';
import { request } from '@/utility/http';
import { Zone } from '@/schema/zone';
import { ComDevice, DeviceState } from '@/schema/com-device';
import { AlarmMessage, PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { RadarInfo } from './radar-info';
import { getColor, getRadius, initMap, loadCircle, loadMap } from './util';
import { BiboBox, MaskBox } from './styled/box';
import { MarkerOptionsEx, SearchFormValue } from './prop';
import { Legend } from './legend';

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

/**
 * 设备报警（地图版本）
 */
const Bibo: FC<{}> = () => {

    const [formRef] = useForm<SearchFormValue>();
    const [loading, setLoading] = useState<boolean>(false);
    const [radar, openRadar] = useState<boolean>(false);
    const [legendVisible, setLegendVisible] = useState<boolean>(true);
    const [deviceId, setDeviceId] = useState<string>('');
    const {
        zoneList,
        phoneAlarmData,
        devicesOnMap,
        alarmsOfDevice,
        queryZoneList,
        queryDevicesOnMap,
        queryDeviceTopAlarms
    } = useModel(state => ({
        zoneList: state.zoneList,
        phoneAlarmData: state.phoneAlarmData,
        devicesOnMap: state.devicesOnMap,
        alarmsOfDevice: state.alarmsOfDevice,
        queryZoneList: state.queryZoneList,
        queryDevicesOnMap: state.queryDevicesOnMap,
        queryDeviceTopAlarms: state.queryDeviceTopAlarms
    }));

    useEffect(() => {
        queryZoneList();
    }, []);

    /**
     * 间隔n秒查询信号环
     */
    const queryDeviceHandle = async () => {
        const tasks = devices.map(item =>
            queryDeviceTopAlarms((item.options as MarkerOptionsEx).deviceId));
        try {
            await Promise.all(tasks);
        } catch (error) {
            console.warn(error);
        }
    };

    useSubscribe('query-each-20', queryDeviceHandle);

    useEffect(() => {

        if (alarmsOfDevice === undefined) {
            return;
        }
        for (let i = 0; i < devices.length; i++) {
            const { deviceId } = devices[i].options as MarkerOptionsEx;
            circles = circles.reduce((acc, current) => {
                if (map && current.deviceId === deviceId) {
                    map.removeLayer(current.circle);
                } else {
                    acc.push(current);
                }
                return acc;
            }, [] as {
                deviceId: string,
                circle: L.Circle
            }[]); //将上一次请求的Circle清除
            const alarms = alarmsOfDevice[deviceId];
            if (alarms && alarms.length > 0) {
                circles = alarms.map(item => {
                    const circle = loadCircle(devices[i].getLatLng(), getColor(item.protocolType!), item.radius);
                    if (map !== null) {
                        circle.addTo(map!);
                    }
                    return {
                        deviceId,
                        circle
                    };
                });
            }
        }
    }, [alarmsOfDevice]);

    useEffect(() => {
        //地图上标记点变化，更新相关设备
        devices = devicesOnMap.map(item => {
            const mark = L.marker([
                item.lat, item.lon
            ], {
                icon: defaultIcon,
                title: item.deviceName,
                deviceId: item.deviceId,
                siteName: item.siteName,
                status: item.status,
                hasAlarm: false
            } as MarkerOptionsEx);
            queryDeviceTopAlarms(item.deviceId);
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
                        // devices = await loadDevice(first.id);
                        map?.setZoom(14);
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
            <Form form={formRef} layout="inline">
                <Item
                    name="zone"
                    label="涉密区域">
                    <Select
                        onChange={onZoneChange}
                        disabled={loading}
                        style={{ width: '180px' }}>
                        {bindZoneOption()}
                    </Select>
                </Item>
            </Form>
            <span>
                <Button
                    onClick={() => setLegendVisible((prev) => !prev)}
                    type="primary">
                    {legendVisible ? '关闭图例' : '查看图例'}
                </Button>
            </span>
        </div>
        <div className="map-box" id="bibo">

        </div>
        <RadarInfo
            open={radar}
            deviceId={deviceId}
            onClose={() => {
                openRadar(false);
            }} />
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