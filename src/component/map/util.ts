import L, { LatLng } from "leaflet";
import { MAP_BACKGROUND_BOUNDS } from "@/utility/helper";
import { Protocol } from "@/schema/protocol";
import { AlarmMessage, PhoneAlarmInfo } from "@/schema/phone-alarm-info";
import { ProtocolColor } from "./prop";
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
 * @param domId 地图DOMid 
 * @param background 地图图像
 */
export const loadMap = (domId: string, background: string): L.Map => {
    let bg = background;
    const map = L.map(domId, {
        zoomControl: false,
        doubleClickZoom: false,
        attributionControl: false,
        maxBounds: MAP_BACKGROUND_BOUNDS,
        minZoom: 11,
        maxZoom: 15
    });
    if (!background.startsWith('data:image/png;base64,')) {
        bg = 'data:image/png;base64,' + background;
    }
    L.imageOverlay(bg, MAP_BACKGROUND_BOUNDS).addTo(map);
    map.fitBounds(MAP_BACKGROUND_BOUNDS);
    map.setMinZoom(11);
    map.setMaxZoom(15);
    // map.setZoom(14);
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
 * 加载圆环
 * @param at 坐标位置
 * @param color 颜色
 * @param rad 半径
 */
export const loadCircle = (at: LatLng, color: string, rad: number) => {
    let circle = L.circle(at, {
        color,
        fillColor: color,
        fillOpacity: 0.05,
        radius: rad
    });
    return circle;
};

/**
 * 清空地图上所有的marker
 * @param devices 
 * @param map 
 */
export const disposeAllMarker = (devices: L.Marker[], map: L.Map | null) => {
    if (map === null) {
        return;
    }
    devices.forEach(item => map.removeLayer(item));
}