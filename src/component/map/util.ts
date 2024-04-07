import PointBluetoothPng from '@/assets/image/point-bluetooth.png';
import PointSignalPng from '@/assets/image/point-signal.png';
import PointWifiPng from '@/assets/image/point-wifi.png';
import PointDevPng from '@/assets/image/point-dev.png';
import L, { LatLngBoundsLiteral } from "leaflet";
// import { MAP_BACKGROUND_BOUNDS } from "@/utility/helper";
import { Protocol } from "@/schema/protocol";
import { Point } from "@/schema/point";
import { AlarmMessage, PhoneAlarmInfo } from "@/schema/phone-alarm-info";
import { ProtocolColor } from "./prop";

const signalIcon = new L.Icon({
    iconUrl: PointSignalPng,
    iconAnchor: [20, 20]
});//制式信号图标
const bluetoothIcon = new L.Icon({
    iconUrl: PointBluetoothPng,
    iconAnchor: [20, 20]
});//蓝牙图标
const wifiIcon = new L.Icon({
    iconUrl: PointWifiPng,
    iconAnchor: [20, 20]
});//WiFi图标
const devIcon = new L.Icon({
    iconUrl: PointDevPng,
    iconAnchor: [20, 20]
});//设备图标

/**
 * 计算实际长度
 */
export const getRealitySize = (size: number) => size / (40008000 / 360);

/**
 * 计算地图实际边界
 * @param width 宽
 * @param height 高
 */
export const calcBounds = (width: number, height: number) => {
    return [
        [0, 0],
        [getRealitySize(height), getRealitySize(width)]
    ] as LatLngBoundsLiteral;
};

/**
 * 清空还原地图
 * @param domId 地图DOM id
 * @param mapInstance 地图实例
 */
export const initMap = (domId: string, mapInstance: L.Map) => {
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
 * @param domId 地图DOM ID 
 * @param background 地图图像
 * @param width 宽
 * @param height 高
 */
export const loadMap = (domId: string, background: string, width: number, height: number): L.Map => {
    let bg = background;
    const bounds = calcBounds(width, height);//接口宽高计算真实宽高
    const map = L.map(domId, {
        zoomControl: false,
        doubleClickZoom: false,
        attributionControl: false,
        maxBounds: bounds
    });
    if (!background.startsWith('data:image/png;base64,')) {
        bg = 'data:image/png;base64,' + background;
    }
    L.imageOverlay(bg, bounds).addTo(map);
    map.fitBounds(bounds);
    map.setMinZoom(18);
    map.setMaxZoom(22);
    // map.setZoom(20);
    return map;
};

/**
 * 返回第一条报警的半径
 * @param alarms 
 */
export const getRadius = (alarms: PhoneAlarmInfo[]) => {

    if (alarms.length === 0) {
        return 500;
    }
    const [first] = alarms;
    try {
        if (typeof first.message === 'string') {
            const message: AlarmMessage = JSON.parse(first.message);
            return Number(message.radius);
        } else {
            return Number((first.message as any)?.radius);
        }
    } catch (error) {
        console.warn(error);
        return 500;
    }
};

/**
 * 返回协议对应颜色值
 * @param protocol 
 */
export const getColor = (protocol: Protocol): string => {

    switch (protocol) {
        case Protocol.ChinaMobile5G:
            return ProtocolColor.ChinaMobile5G;
        case Protocol.ChinaMobileGSM:
            return ProtocolColor.ChinaMobileGSM;
        case Protocol.ChinaMobileTDDLTE:
            return ProtocolColor.ChinaMobileTDDLTE;
        case Protocol.ChinaUnicom5G:
            return ProtocolColor.ChinaUnicom5G;
        case Protocol.ChinaUnicomFDDLTE:
            return ProtocolColor.ChinaUnicomFDDLTE;
        case Protocol.ChinaUnicomGSM:
            return ProtocolColor.ChinaUnicomGSM;
        case Protocol.ChinaUnicomWCDMA:
            return ProtocolColor.ChinaUnicomWCDMA;
        case Protocol.ChinaTelecom5G:
            return ProtocolColor.ChinaTelecom5G;
        case Protocol.ChinaTelecomCDMA:
            return ProtocolColor.ChinaTelecomCDMA;
        case Protocol.ChinaTelecomFDDLTE:
            return ProtocolColor.ChinaTelecomFDDLTE;
        case Protocol.ChinaBroadnet5G:
            return ProtocolColor.ChinaBroadnet5G;
        case Protocol.Detectaphone:
            return ProtocolColor.Detectaphone;
        case Protocol.Bluetooth50:
            return ProtocolColor.Bluetooth50;
        case Protocol.WiFi24G:
            return ProtocolColor.WiFi24G;
        case Protocol.WiFi58G:
            return ProtocolColor.WiFi58G;
        case Protocol.GPSLocator:
            return ProtocolColor.GPSLocator;
        case Protocol.Camera:
            return ProtocolColor.Camera;
        case Protocol.Others:
            return ProtocolColor.Others;
        default:
            return '#fff';
    }
};

/**
 * 清空地图上所有的marker
 * @param devices 
 * @param map 
 */
export const disposeAllMarker = (m: L.Marker[], map: L.Map | null) => {
    if (map === null) {
        return;
    }
    m.forEach(item => map.removeLayer(item));
}

const getPointIcon = (protocol: Protocol) => {
    switch (protocol) {
        case Protocol.Bluetooth50:
            return bluetoothIcon;
        case Protocol.WiFi24G:
        case Protocol.WiFi58G:
            return wifiIcon;
        case Protocol.Terminal:
            return devIcon;
        default:
            return signalIcon;
    }
};

/**
 * 定位点转为地图标记
 */
export const pointToMarker = (points: Point[]) => points
    .map(item => {
        const mark = L.marker([
            Number.parseFloat(item.lat),
            Number.parseFloat(item.lon)
        ], {
            icon: getPointIcon(item.protocolType),
            title: item.content,
            actionTime: item.actionTime
        } as any);
        mark.on('click', (e) => {
            console.clear();
            console.log(e.target.options);
        });
        return mark;
    });