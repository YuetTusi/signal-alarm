
import { AlarmSiteTop } from '@/schema/alarm-site-top';
import { alarmSiteTopStatis } from './alarm-site-top-statis';

/**
 * 告警场所Top10图表统计
 */
interface AlarmSiteTopStatisState {

    alarmSiteTopStatisData: AlarmSiteTop[]
    /**
     * 查询告警场所Top10（柱状图）
     */
    queryAlarmSiteTopStatisData: () => void
}


export type { AlarmSiteTopStatisState };
export { alarmSiteTopStatis };