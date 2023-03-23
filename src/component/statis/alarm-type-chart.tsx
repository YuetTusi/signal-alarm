
import { FC, useEffect } from 'react';
import useModel from '@/model';
import { Loop } from '@/component/chart';
import { getProtocolLabel } from '@/schema/protocol';
import { DisplayPanel } from '../panel';

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
        <div className="caption">告警类型统计</div>
        <div className="content">
            <Loop serieName="告警类型统计" data={convertData()} />
        </div>
    </DisplayPanel>;
};

export { AlarmTypeChart };