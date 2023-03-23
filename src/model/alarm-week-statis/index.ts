import { AlarmWeek } from "@/schema/alarm-week";
import { alarmWeekStatis } from './alarm-week-statis';

interface AlarmWeekStatisState {

    /**
     * 7天告警数量图表数据
     */
    alarmWeekStatisData: AlarmWeek[]
    /**
     * 查询7天告警数量图表数据
     */
    queryAlarmWeekStatisData: () => void
}


export type { AlarmWeekStatisState };
export { alarmWeekStatis };