import { FC, useEffect, useState } from 'react';
import { Protocol, getProtocolName } from '@/schema/protocol';



/**
 * 协议点
 */
const Point: FC<{
    top: number,
    left: number,
    protocol: Protocol
}> = ({ top, left, protocol }) => {

    const [hide, setHide] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setHide(true);
        }, 5000);
    }, []);

    return <div
        style={{
            display: hide ? 'none' : 'block',
            top: `${top}%`,
            left: `${left}%`,
            animation: `flash1 2s infinite`
        }}
        className={`pointer ${getProtocolName(protocol)}`}
    />;
};

export { Point };