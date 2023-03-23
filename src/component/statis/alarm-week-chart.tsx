
import { FC, useEffect } from 'react';
import useModel from '@/model';
import { Loop } from '@/component/chart';
import { getProtocolLabel } from '@/schema/protocol';
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
        alarmWeekStatisData.map(item => ({
            name: getProtocolLabel(item.protocolType),
            value: item.num
        }));

    return <DisplayPanel>
        <div className="caption">近7天告警数量统计</div>
        <div className="content">
            <Loop serieName="近7天告警数量统计" data={convertData()} />
        </div>
    </DisplayPanel>;
};

export { AlarmWeekChart };