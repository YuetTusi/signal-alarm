
import { alarmChart } from './alarm-chart';

interface AlarmBarValue {
    rssi: number | null,
    captureTime: string,
    deviceId: string,
    siteName: string,
    status: number,
    protocol: string,
    protocolType: number,
    arfcn: number,
    warnReason: string,
    areaId: number
}

/**
 * 报警柱状图
 */
interface AlarmChartState {
    /**
     * 报警柱图数据
     * X轴固定为12个
     */
    alarmBarData: Map<number, AlarmBarValue>,
    /**
     * 更新柱图数据
     * @param code 键
     * @param value 值
     */
    updateAlarmBarData: (code: number, value: AlarmBarValue) => void,
    /**
     * 删除n秒前的柱数据
     * @param sec 秒
     */
    removeBeforeSecAlarmBarData: (sec: number) => void,
    /**
     * 清空柱图数据
     */
    cleanAlarmBarData: () => void
}

export { alarmChart };
export type { AlarmBarValue, AlarmChartState };