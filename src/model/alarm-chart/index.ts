
import { alarmChart } from './alarm-chart';

/**
 * 报警柱状图
 */
interface AlarmChartState {
    /**
     * 报警柱图数据
     * X轴固定为12个
     */
    alarmBarData: Map<number, { rssi: number | null, captureTime: string }>,
    /**
     * 更新柱图数据
     * @param code 键
     * @param value 值
     */
    updateAlarmBarData: (code: number, value: { rssi: number | null, captureTime: string }) => void,
    /**
     * 清空柱图数据
     */
    cleanAlarmBarData: () => void
}

export { alarmChart };
export type { AlarmChartState };