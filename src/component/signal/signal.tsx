import { FC, ReactElement } from 'react';
import { Tooltip } from 'antd';
import { SignalBox } from './styled/box';
import { SignalProp } from './prop';

/**
 * 信号强度展示组件
 */
const Signal: FC<SignalProp> = ({ value, min, max }) => {

    const i = () => {
        const dom: ReactElement[] = [];
        const rate = 1 - Math.abs(value) / (max! - min!);
        for (let i = 0; i < 5; i++) {
            dom.push(<i className={rate * 10 / 2 > i ? 'active' : 'gray'} key={`Signal_${i}`} />);
        }
        return dom;
    };

    return <Tooltip
        title={`强度值: ${value}`}
        placement="left">
        <SignalBox>
            {i()}
        </SignalBox>
    </Tooltip>
};

Signal.defaultProps = {
    min: 0,
    max: 300
}

export { Signal };