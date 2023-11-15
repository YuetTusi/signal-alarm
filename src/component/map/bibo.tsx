import markerIconPng from '@/assets/image/marker-icon.png';
import offlineIconPng from '@/assets/image/offline-icon.png';
import warnIconPng from '@/assets/image/warn-icon.png';
import L, { LatLngBoundsLiteral } from 'leaflet';
import { FC, useEffect, useState, useCallback } from 'react';
import { Form, Spin, Select, message } from 'antd';
import { useModel } from '@/model';
import { useUnmount } from '@/hook';
import { request } from '@/utility/http';
import { Zone } from '@/schema/zone';
import { ComDevice, DeviceState } from '@/schema/com-device';
import { AlarmMessage, PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { RadarInfo } from './radar-info';
import { BiboBox, MaskBox } from './styled/box';
import { MarkerOptionsEx, SearchFormValue } from './prop';

const { useForm, Item } = Form;
const { Option } = Select;
let map: L.Map | null = null;
let devices: L.Marker[] = []; //设备坐标点
const defaultIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconAnchor: [12, 44]
});//默认图标
const offlineIcon = new L.Icon({
    iconUrl: offlineIconPng,
    iconAnchor: [12, 44]
});//离线图标
const warnIcon = new L.Icon({
    iconUrl: warnIconPng,
    iconAnchor: [12, 44]
});//报警图标
let imageBounds: LatLngBoundsLiteral = [[40.712216, -74.22655], [40.773941, -74.12544]];

/**
 * 清空还原地图
 * @param domId 地图DOM id
 * @param mapInstance 地图实例
 */
const initMap = (domId: string, mapInstance: L.Map) => {
    if (mapInstance !== null) {
        mapInstance.remove();
    }
    var container = L.DomUtil.get(domId);
    if (container !== null) {
        (container as any)._leaflet_id = null;
    }
};

/**
 * 加载地图
 * @param domId 地图DOMid 
 * @param background 地图图像
 */
const loadMap = (domId: string, background: string): L.Map => {
    let bg = background;
    map = L.map(domId, {
        zoomControl: false,
        doubleClickZoom: false,
        attributionControl: false,
        maxBounds: imageBounds,
        minZoom: 11,
        maxZoom: 15
    });
    if (!background.startsWith('data:image/png;base64,')) {
        bg = 'data:image/png;base64,' + background;
    }
    L.imageOverlay(bg, imageBounds).addTo(map);
    map.fitBounds(imageBounds);
    // map.setMinZoom(11);
    // map.setMaxZoom(15);
    map.setZoom(14);
    return map;
};

/**
 * 渲染报警表格
 */
const renderAlarmTable = (alarms: PhoneAlarmInfo[] = []): string => {
    if (alarms.length === 0) {
        return '';
    }
    const rows = alarms.map(item => {
        let message: AlarmMessage;
        if (typeof item.message === 'string') {
            message = JSON.parse(item.message);
        } else {
            message = item.message;
        }
        return `<tr>
            <td>${message?.captureTime ?? '-'}</td>
            <td>${message?.protocol ?? '-'}</td>
            <td>${message?.rssi ?? '-'}</td>
            <td>${message?.siteName ?? '-'}</td>
            <td>${message?.arfcn ?? '-'}</td>
            <td>${message?.warnReason ?? '-'}</td>
        </tr>`;
    });
    return `<table>
    <thead>
        <tr>
        <th>采集时间</th><th>协议类型</th><th>强度</th><th>设备场所</th><th>频点信息</th><th>告警原因</th>
        </tr>
    </thead>
    <tbody>
        ${rows.join('')}
    </tbody>
    </table>`;
};

/**
 * 设备报警（地图版本）
 */
const Bibo: FC<{}> = () => {

    const [formRef] = useForm<SearchFormValue>();
    const [loading, setLoading] = useState<boolean>(false);
    const [radar, openRadar] = useState<boolean>(false);
    const [deviceId, setDeviceId] = useState<string>('');
    const {
        zoneList,
        phoneAlarmData,
        queryZoneList
    } = useModel(state => ({
        zoneList: state.zoneList,
        phoneAlarmData: state.phoneAlarmData,
        queryZoneList: state.queryZoneList
    }));

    useEffect(() => {
        queryZoneList();
    }, []);

    useEffect(() => {

        for (let i = 0; i < devices.length; i++) {
            const { deviceId } = devices[i].options as MarkerOptionsEx;
            const alarms: PhoneAlarmInfo[] = phoneAlarmData.filter(item => {
                let message: AlarmMessage;
                if (typeof item.message === 'string') {
                    message = JSON.parse(item.message);
                } else {
                    message = item.message;
                }
                return message.deviceId === deviceId;
            });
            if (alarms.length > 0) {
                devices[i].setIcon(warnIcon);
                (devices[i].options as MarkerOptionsEx).hasAlarm = true;
            } else {
                devices[i].setIcon(defaultIcon);
                (devices[i].options as MarkerOptionsEx).hasAlarm = false;
            }
        }
    }, [phoneAlarmData]);

    /**
     * 加载设备，返回所属区域下设备坐标点
     * @param id 区域id
     */
    const loadDevice = useCallback(async (id: number) => {
        const url = `/sys/area/get-device-info/${id}`;
        try {
            const res = await request.get<ComDevice[]>(url);
            if (res !== null && res.code === 200 && map !== null) {
                return res.data.map(item => {
                    const mark = L.marker([
                        item.lat, item.lon
                    ], {
                        icon: item.status === DeviceState.Normal ? defaultIcon : offlineIcon,
                        title: item.deviceName,
                        deviceId: item.deviceId,
                        siteName: item.siteName,
                        status: item.status,
                        hasAlarm: false
                    } as MarkerOptionsEx).addTo(map!);
                    mark.on('click', (e) => {
                        const { deviceId, hasAlarm } = e.target.options;
                        console.log(e.target.options);
                        if (hasAlarm) {
                            setDeviceId(deviceId);
                            openRadar(true);
                        } else {
                            message.destroy();
                            message.info('暂无告警消息');
                        }
                    });
                    return mark;
                });
            } else {
                return [];
            }
        } catch (error) {
            console.warn(error);
            return [];
        }
    }, []);

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
                        loadMap('bibo', res.data.areaBg);
                        devices = await loadDevice(first.id);
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
        try {
            const res = await request.get<Zone>(`/sys/area/get-area-info/${value}`);
            if (res !== null && res.code === 200) {

                if (map !== null) {
                    initMap('bibo', map);
                }
                loadMap('bibo', res.data.areaBg);
            }
            devices = await loadDevice(value);

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