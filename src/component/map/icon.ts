import L from 'leaflet';
import mapConnectedIcon from '@/assets/image/map-connected.png';
import mapWarnIcon from '@/assets/image/map-warn.png';
import mapOfflineIcon from '@/assets/image/map-offline.png';
import bluetoothPoint from '@/assets/image/point-bluetooth.png';
import wifiPoint from '@/assets/image/point-wifi.png';
import signalPoint from '@/assets/image/point-signal.png';
import lchinabroadnet5gIcon from '@/assets/image/l-chinabroadnet5g.png';
import lchinamobile5gIcon from '@/assets/image/l-chinamobile5g.png';
import lchinamobilegsmIcon from '@/assets/image/l-chinamobilegsm.png';


export const defaultIcon = new L.Icon({
    iconUrl: mapConnectedIcon,
    iconAnchor: [21, 59]
});//默认图标
export const warnIcon = new L.Icon({
    iconUrl: mapWarnIcon,
    iconAnchor: [21, 59]
});//报警图标
export const offlineIcon = new L.Icon({
    iconUrl: mapOfflineIcon,
    iconAnchor: [21, 59]
});//离线图标
export const bluetoothIcon = new L.Icon({
    iconUrl: bluetoothPoint,
    iconSize: [36, 36]
});//蓝牙图标
export const wifiIcon = new L.Icon({
    iconUrl: wifiPoint,
    iconSize: [36, 36]
});//WiFi图标
export const signalIcon = new L.Icon({
    iconUrl: signalPoint,
    iconSize: [36, 36]
});//信号图标
export const chinabroadnet5gIcon = new L.Icon({
    iconUrl: lchinabroadnet5gIcon,
    iconSize: [36, 36]
});//中国广电5G
export const chinamobile5gIcon = new L.Icon({
    iconUrl: lchinamobile5gIcon,
    iconSize: [36, 36]
});//中国移动5G
export const chinamobilegsmIcon = new L.Icon({
    iconUrl: lchinamobilegsmIcon,
    iconSize: [36, 36]
});//中国移动GSM