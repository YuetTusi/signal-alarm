import { FC, ReactElement } from 'react';
import { Tooltip } from 'antd';
import { SignalBox } from './styled/box';
import { SignalProp } from './prop';

const getColor = (rate: number) => {

    const val = rate * 10 / 2 + 1;

    if (val <= 3) {
        return 'green'
    } else if (val > 4) {
        return 'red';
    } else {
        return 'yellow';
    }
};

/**
 * 信号强度展示组件
 */
const Signal: FC<SignalProp> = ({ value, min, max }) => {

    const i = () => {
        const dom: ReactElement[] = [];
        const rate = 1 - Math.abs(value) / (max! - min!);

        for (let i = 0; i < 5; i++) {
            dom.push(<i className={rate * 10 / 2 > i ? getColor(rate) : 'gray'} key={`Signal_${i}`} />);
        }
        return dom;
    };

    return <Tooltip
        title={`强度值: ${value}dBm`}
        placement="left">
        <SignalBox>
            {i()}
        </SignalBox>
    </Tooltip>
};


export { Signal };