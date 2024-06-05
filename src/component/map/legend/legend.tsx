import PointBluetoothPng from '@/assets/image/point-bluetooth.png';
import PointSignalPng from '@/assets/image/point-signal.png';
import PointWifi24Png from '@/assets/image/point-wifi24.png';
import PointWifi58Png from '@/assets/image/point-wifi58.png';
import PointDevPng from '@/assets/image/point-dev.png';
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
        <img src={PointWifi58Png} alt="WiFi5.8" />
        <span>WiFi5.8G</span>
    </li>
    <li>
        <img src={PointWifi24Png} alt="WiFi2.4" />
        <span>WiFi2.4G</span>
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