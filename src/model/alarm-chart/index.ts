
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
    warnReason: string
}

/**
 * 报警柱状图
 */
interface AlarmChartState {

    /**
     * 当前正在展示的设备id
     * 如果地图上点了某个设备，柱图只显示此设备的数据
     */
    alarmBarDeviceId?: string,
    /**
     * 报警柱图数据
     * X轴固定为12个
     */
    alarmBarData: Map<number, AlarmBarValue>,
    /**
     * 更新当前显示的设备id
     * @param payload deviceId
     */
    setAlarmBarDeviceId: (payload: string | undefined) => void,
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