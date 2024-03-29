import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { useSubscribe } from '@/hook';
import { DisplayPanel } from '../panel';
import { ClockBox } from './styled/box';
import { ClockProp } from './prop';

/**
 * 时钟 
 */
const Clock: FC<ClockProp> = () => {

    const [timeString, setTimeString] = useState<string>('');

    useSubscribe('query-each-1', () => {
        setTimeString(dayjs().format('HH:mm:ss'));
    });

    return <DisplayPanel style={{ marginBottom: '10px' }}>
        <div className="content">
            <ClockBox>
                <div className="clock-date">
                    {dayjs().format('YYYY年MM月DD日 dddd')}
                </div>
                {/* <hr /> */}
                <div className="clock-time">
                    {timeString}
                </div>
            </ClockBox>
        </div>
    </DisplayPanel>;
};

export { Clock };