import { AlarmType } from "@/schema/alarm-type";
import { alarmTypeStatis } from './alarm-type-statis';

interface AlarmTypeStatisState {

    /**
     * 查询告警类型图表数据
     */
    alarmTypeStatisData: AlarmType[]
    /**
     * 查询告警类型统计数据（玫瑰图）
     */
    queryAlarmTypeStatis: () => void
}


export type { AlarmTypeStatisState };
export { alarmTypeStatis };