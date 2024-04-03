import PointBluetoothPng from '@/assets/image/point-bluetooth.png';
import PointSignalPng from '@/assets/image/point-signal.png';
import PointWifiPng from '@/assets/image/point-wifi.png';
import PointDevPng from '@/assets/image/point-bluetooth.png';
import { FC } from 'react';
import { LegendBox } from './styled/box';
import { LegendProp } from './prop';

/**
 * 图例
 */
const Legend: FC<LegendProp> = ({ visible }) => <LegendBox
    style={{ display: visible ? 'block' : 'none' }}>
    <li>
        <img src={PointSignalPng} alt="制式信号" />
        <span>制式信号</span>
    </li>
    <li>
        <img src={PointWifiPng} alt="WiFi" />
        <span>WiFi</span>
    </li>
    <li>
        <img src={PointBluetoothPng} alt="蓝牙" />
        <span>蓝牙</span>
    </li>
    <li>
        <img src={PointDevPng} alt="终端" />
        <span>终端</span>
    </li>
</LegendBox>;

export { Legend };