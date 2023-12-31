
import { alarmChart } from './alarm-chart';

/**
 * 报警柱状图
 */
interface AlarmChartState {
    /**
     * 报警柱图数据
     * X轴固定为12个
     */
    alarmBarData: Record<string, { rssi: number | null, captureTime: string }>,
    /**
     * 更新柱图数据
     * @param name 键
     * @param value 值
     */
    updateAlarmBarData: (name: string, value: { rssi: number | null, captureTime: string }) => void
}

export { alarmChart };
export type { AlarmChartState };