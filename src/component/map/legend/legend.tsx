import { FC } from 'react';
import { Protocol, getProtocolLabel } from '@/schema/protocol';
import { LegendBox } from './styled/box';
import { ProtocolColor } from '../prop';
import { LegendProp } from './prop';

/**
 * 图例
 */
const Legend: FC<LegendProp> = ({ visible }) => {

    const render = () =>
        Object
            .entries(ProtocolColor)
            .filter(([name]) => ![
                Protocol[Protocol.WiFi24G],
                Protocol[Protocol.WiFi58G],
                Protocol[Protocol.Bluetooth50],
                Protocol[Protocol.Detectaphone],
                Protocol[Protocol.GPSLocator],
                Protocol[Protocol.Camera],
                Protocol[Protocol.Others],
                Protocol[Protocol.Terminal] //过滤掉部分类型
            ].some(i => i === name))
            .map(([name, color]) => <li key={`L_${name}`}>
                <i style={{ backgroundColor: color }} />
                <span>{getProtocolLabel(Protocol[name as any] as any)}</span>
            </li>);

    return <LegendBox style={{ display: visible ? 'block' : 'none' }}>
        {render()}
    </LegendBox>;
};

export { Legend };