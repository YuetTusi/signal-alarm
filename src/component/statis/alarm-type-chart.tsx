
import { FC, useEffect } from 'react';
import useModel from '@/model';
import { Loop } from '@/component/chart';
import { getProtocolLabel } from '@/schema/protocol';
import { DisplayPanel } from '../panel';

/**
 * 告警类型统计图表
 */
const AlarmTypeChart: FC<{}> = () => {

    const {
        alarmTypeStatisData,
        queryAlarmTypeStatis
    } = useModel(state => ({
        alarmTypeStatisData: state.alarmTypeStatisData,
        queryAlarmTypeStatis: state.queryAlarmTypeStatis
    }));

    useEffect(() => {
        queryAlarmTypeStatis();
    }, []);

    const convertData = () =>
        alarmTypeStatisData.map(item => ({
            name: getProtocolLabel(item.protocolType),
            value: item.num
        }));

    return <DisplayPanel>
        <div className="caption">近7天告警类型统计</div>
        <div className="content">
            <Loop serieName="近7天告警类型统计" data={convertData()} />
        </div>
    </DisplayPanel>;
};

export { AlarmTypeChart };