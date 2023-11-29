import { FC, useEffect, useState } from 'react';
import { Protocol, getProtocolName } from '@/schema/protocol';
import { AlarmMessage } from '@/schema/phone-alarm-info';

let timer: any = null;

/**
 * 协议点
 */
const Point: FC<{
    top: number,
    left: number,
    data: AlarmMessage
}> = ({ top, left, data }) => {

    const [hide, setHide] = useState<boolean>(false);

    useEffect(() => {
        setHide(false);
        timer = setTimeout(() => {
            setHide(true);
        }, 5000);
        return () => {
            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
            }
        };
    }, [data]);

    return <div
        style={{
            display: hide ? 'none' : 'block',
            top: `${top}%`,
            left: `${left}%`,
            animation: `flash1 2s infinite`
        }}
        className={`pointer ${getProtocolName(data.protocolType!)}`}
    />;
};

export { Point };