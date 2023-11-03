import random from 'lodash/random';
import shuffle from 'lodash/shuffle';
import { FC } from 'react';
import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { FloatItem } from './float-item';
import { FloatAlarmBox } from './styled/box';

const shuffleIndex: number[] = shuffle([0, 1, 2, 3, 4]);
const shuffleTops: number[] = [
    random(20, 360),
    random(20, 300),
    random(20, 300),
    random(20, 300),
    random(20, 360)
];

/**
 * 浮动报警组件
 */
const FloatAlarm: FC<{ data: PhoneAlarmInfo[] }> = ({ data }) => {

    const render5Item = () => {
        return shuffleIndex.map((i, index) => {
            return <FloatItem
                data={data[i]}
                top={shuffleTops[index]}
                key={`FAI_${index}`} />
        });
    }

    return <FloatAlarmBox>
        {render5Item()}
    </FloatAlarmBox>
};

export { FloatAlarm };