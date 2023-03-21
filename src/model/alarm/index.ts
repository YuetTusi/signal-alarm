
import { AlarmMsg } from '@/schema/alarm-msg';
import { alarm } from './alarm';

/**
 * 预警信息
 */
interface AlarmState {

    /**
     * Top10数据
     */
    alarmTop10Data: AlarmMsg[],
    /**
     * 分页数据
     */
    alarmData: AlarmMsg[],
    /**
     * 当前页
     */
    alarmPageIndex: number,
    /**
     * 分页尺寸
     */
    alarmPageSize: number,
    /**
     * 总数
     */
    alarmTotal: number,
    /**
     * 加载中
     */
    alarmTop10Loading: boolean,
    /**
     * 加载中
     */
    alarmLoading: boolean,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setAlarmLoading: (payload: boolean) => void,
    /**
     * 更新Top10加载中状态
     * @param payload 
     */
    setAlarmTop10Loading: (payload: boolean) => void,
    /**
     * 更新分页数据
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setAlarmPage: (pageIndex: number, pageSize: number, total: number) => void,
    /**
     * 查询预警信息Top10数据
     */
    queryAlarmTop10Data: () => void,
    /**
     * 查询预警信息分页数据
     */
    queryAlarmData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 导出预警信息数据
     */
    exportAlarmData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => Promise<Buffer>,
    /**
     * 处理预警信息
     */
    processAlarm: (id: number, status: number, remark?: string) => Promise<boolean>,
}

export type { AlarmState };
export { alarm };