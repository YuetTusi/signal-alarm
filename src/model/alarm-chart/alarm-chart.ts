import dayjs from 'dayjs';
import { GetState, SetState } from '..';
import { AlarmBarValue, AlarmChartState } from '../alarm-chart';

const alarmChart = (setState: SetState, getState: GetState): AlarmChartState => ({

    /**
     * 报警柱图数据
     * X轴固定为12个
     */
    alarmBarData: new Map<number, AlarmBarValue>(),
    /**
    * 当前正在展示的设备id
    * 如果地图上点了某个设备，柱图只显示此设备的数据
    */
    alarmBarDeviceId: undefined,
    /**
     * 更新当前显示的设备id
     * @param payload deviceId
     */
    setAlarmBarDeviceId(payload: string | undefined) {
        setState({ alarmBarDeviceId: payload });
    },
    /**
     * 更新柱图数据
     * @param name 键
     * @param value 值
     */
    updateAlarmBarData(code: number, value: AlarmBarValue) {
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