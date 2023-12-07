import { FC } from 'react';
import { Protocol, getProtocolLabel } from '@/schema/protocol';
import { ProtocolColor } from '../prop';
import { LegendProp } from './prop';
import { LegendBox } from './styled/box';

/**
 * 图例
 */
const Legend: FC<LegendProp> = ({ visible }) => {

    const render = () =>
        Object.entries(ProtocolColor).map(([name, color]) =>
            <li key={`L_${name}`}>
                <i style={{ backgroundColor: color }} />
                <span>{getProtocolLabel(Protocol[name as any] as any)}</span>
            </li>
        );

    return <LegendBox style={{ display: visible ? 'block' : 'none' }}>
        {render()}
    </LegendBox>;
};

export { Legend };