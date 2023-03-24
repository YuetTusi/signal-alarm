import dayjs from 'dayjs';
import { FC, useEffect } from 'react';
import useModel from '@/model';
import { Line } from '@/component/chart';
import { DisplayPanel } from '../panel';

/**
 * 7天告警数量统计
 */
const AlarmWeekChart: FC<{}> = () => {

    const {
        alarmWeekStatisData,
        queryAlarmWeekStatisData
    } = useModel(state => ({
        alarmWeekStatisData: state.alarmWeekStatisData,
        queryAlarmWeekStatisData: state.queryAlarmWeekStatisData
    }));

    useEffect(() => {
        queryAlarmWeekStatisData();
    }, []);

    const convertData = () =>
        alarmWeekStatisData.reduce<{ days: string[], num: number[] }>((total, current) => {
            total.days.push(dayjs(current.day).format('YYYY/M/D'));
            total.num.push(Number(current.num));
            return total;
        }, {
            days: [],
            num: []
        });

    const { days, num } = convertData();

    return <DisplayPanel>
        <div className="caption">近7天告警数量统计</div>
        <div className="content">
            <Line serieName="近7天告警数量统计" data={num} days={days} />
        </div>
    </DisplayPanel>;
};

export { AlarmWeekChart };