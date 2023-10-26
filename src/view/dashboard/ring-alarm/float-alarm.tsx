import { FC, useEffect } from 'react';
import { useModel } from '@/model';
import { PointItem } from './point-item';
import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { FloatItem } from './float-item';
import { FloatAlarmBox } from './styled/box';

/**
 * 浮动报警组件
 */
const FloatAlarm: FC<{ data: PhoneAlarmInfo[] }> = ({ data }) => {

    const renderItem = () =>
        data.map((data, index) => <FloatItem
            data={data}
            key={`FI_${index}`} />
        );

    return <FloatAlarmBox>
        {renderItem()}
    </FloatAlarmBox>
};

export { FloatAlarm };