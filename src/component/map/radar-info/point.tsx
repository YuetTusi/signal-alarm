import dayjs from 'dayjs';
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
}> = ({ top, left, data }) => {

    /**
     * 采集时间是否超过5秒
     * @param date 采集时间
     */
    const isOver5Second = (date: string) => {
        try {
            return dayjs().diff(date, 's') > 5;
        } catch (error) {
            return false;
        }
    };

    return <div
        style={{
            top: `${top}%`,
            left: `${left}%`,
            animation: `flash1 2s infinite`
        }}
        className={`pointer ${getProtocolName(data.protocolType!)}`}
    />;
};

export { Point };