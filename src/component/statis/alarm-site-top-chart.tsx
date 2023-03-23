
import { FC, useEffect } from 'react';
import useModel from '@/model';
import { Rose } from '@/component/chart/rose';
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

    const convertData = () =>
        alarmSiteTopStatisData.map(item => ({
            name: item.siteName,
            value: Number.parseInt(item.num)
        }));

    return <DisplayPanel>
        <div className="caption">告警场所Top10</div>
        <div className="content">
            <Rose serieName="告警场所Top10" data={convertData()} />
        </div>
    </DisplayPanel>;
};

export { AlarmSiteTopChart };