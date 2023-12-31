
import { FC, useEffect } from 'react';
import useModel from '@/model';
import { Bar } from '@/component/chart';
import { CenterFixedBox } from './styled/box'
import { DisplayPanel } from '../panel';

/**
 * 告警场所Top10图表
 */
const AlarmSiteTopChart: FC<{}> = () => {

    const {
        alarmSiteTopStatisData,
        queryAlarmSiteTopStatisData
    } = useModel(state => ({
        alarmSiteTopStatisData: state.alarmSiteTopStatisData,
        queryAlarmSiteTopStatisData: state.queryAlarmSiteTopStatisData
    }));

    useEffect(() => {
        queryAlarmSiteTopStatisData();
    }, []);

    return <DisplayPanel>
        <div className="caption">近一个月告警场所Top10</div>
        <div className="content">
            <CenterFixedBox>
                <Bar
                    serieName="近一个月告警场所Top10"
                    xData={alarmSiteTopStatisData.map(item => item.siteName)}
                    yData={alarmSiteTopStatisData.map(item => Number(item.num))} />
            </CenterFixedBox>
        </div>
    </DisplayPanel>;
};

export { AlarmSiteTopChart };