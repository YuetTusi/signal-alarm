import dayjs from 'dayjs';
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
        prev.set(Number(code), value);
        setState({ alarmBarData: new Map(prev) });
    },
    /**
     * 删除n秒前的柱数据
     * @param sec 秒
     */
    removeBeforeSecAlarmBarData(sec: number) {

        const prev = getState().alarmBarData;
        const now = dayjs();

        prev.forEach((v, k) => {
            if (now.diff(v.captureTime, 's') > sec) {
                prev.delete(k);
            }
        });
        setState({ alarmBarData: new Map(prev) });
    },
    /**
     * 清空柱图数据
     */
    cleanAlarmBarData() {
        setState({ alarmBarData: new Map() });
    }
});

export { alarmChart };