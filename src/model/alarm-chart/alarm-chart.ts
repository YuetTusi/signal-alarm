import { GetState, SetState } from '..';
import { AlarmChartState } from '../alarm-chart';

const alarmChart = (setState: SetState, getState: GetState): AlarmChartState => ({

    /**
     * 报警柱图数据
     * X轴固定为12个
     */
    alarmBarData: new Map<number, { rssi: number | null, captureTime: string }>(),
    /**
     * 更新柱图数据
     * @param name 键
     * @param value 值
     */
    updateAlarmBarData(code: number, value: { rssi: number | null, captureTime: string }) {
        const prev = getState().alarmBarData;
        prev.set(code, value);
        setState({ alarmBarData: new Map(prev) });
    }
});

export { alarmChart };