import mapConnectedIcon from '@/assets/image/map-connected.png';
import mapWarnIcon from '@/assets/image/map-warn.png';
import mapOfflineIcon from '@/assets/image/map-offline.png';
import L from 'leaflet';
import { FC, useEffect, useState } from 'react';
import { Button, Form, Spin, Select, message } from 'antd';
import { useModel } from '@/model';
import { useUnmount, useSubscribe, usePhoneAlarm } from '@/hook';
import { request } from '@/utility/http';
import { Zone } from '@/schema/zone';
import { Legend } from './legend';
import { RadarInfo } from './radar-info';
import { getColor, initMap, loadCircle, loadMap } from './util';
import { BiboBox, MaskBox } from './styled/box';
import { MarkerOptionsEx, SearchFormValue } from './prop';
import { DeviceState } from '@/schema/com-device';

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

    // const alarmData = usePhoneAlarmOfDevice(deviceId, phoneAlarmData);

    /**
     * 间隔n秒查询信号环
     */
    const queryDeviceHandle = async () => {
        const tasks = devices.map(item => {
            const { deviceId } = item.options as MarkerOptionsEx;
            if (map !== null) {
                const willRemove = circles.filter(i => i.deviceId === deviceId);
                for (let i = 0; i < willRemove.length; i++) {
                    map.removeLayer(willRemove[i].circle);
                }
            }
            return queryDeviceTopAlarms(deviceId);
        });

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
            const alarms = alarmsOfDevice[deviceId];

            if (alarms && alarms.length > 0) {
                circles = alarms.map(item => {
                    const circle = loadCircle(devices[i].getLatLng(), getColor(item.protocolType!), item.radius);
                    if (map !== null) {
                        // const has = circles.find(item => item.deviceId === deviceId);
                        // console.log(has);
                        // if (has !== undefined) {
                        //     map.removeLayer(has.circle);
                        // }
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
                icon: item.status === DeviceState.Normal ? defaultIcon : offlineIcon,
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
        for (let i = 0; i < devices.length; i++) {
            const { deviceId } = devices[i].options as MarkerOptionsEx;
            if (alarms[deviceId] && alarms[deviceId].length > 0) {
                devices[i].setIcon(warnIcon);
                (devices[i].options as MarkerOptionsEx).hasAlarm = true;
            } else {
                (devices[i].options as MarkerOptionsEx).status === DeviceState.Normal
                    ? devices[i].setIcon(defaultIcon)
                    : devices[i].setIcon(offlineIcon);

                (devices[i].options as MarkerOptionsEx).hasAlarm = false;
            }
        }
    }, [alarms]);

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