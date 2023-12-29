import { FC } from 'react';
import { getProtocolName } from '@/schema/protocol';
import { AlarmMessage } from '@/schema/phone-alarm-info';

/**
 * 协议点
 */
const Point: FC<{
    top: number,
    left: number,
    data: AlarmMessage
}> = ({ top, left, data }) => <div
    style={{
        top: `${top}%`,
        left: `${left}%`,
        animation: `flash1 2s infinite`
    }}
    className={`pointer ${getProtocolName(data.protocolType!)}`}
/>;

export { Point };