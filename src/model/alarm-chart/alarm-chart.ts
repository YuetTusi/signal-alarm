import { GetState, SetState } from '..';
import { AlarmChartState } from '../alarm-chart';

const alarmChart = (setState: SetState, getState: GetState): AlarmChartState => ({

    /**
     * 报警柱图数据
     * X轴固定为12个
     */
    alarmBarData: {
        "移动/联通(2G/4G-B8)": null,
        "移动/联通(2G),全制式(4G-B3)": null,
        "电信(2G/3G/4G-B5)": null,
        "联通(3G),联通/电信(4G-B1/N1)": null,
        "移动(4G-B34)": null,
        "移动/广电(4G-B39)": null,
        "移动/广电(4G-B40)": null,
        "移动/广电(4G-B41/5G-N41)": null,
        "移动/广电(5G-N28)": null,
        "联通/电信(5G-N77)": null,
        "联通/电信(5G-N78)": null,
        "移动/广电(5G-N79)": null
    },
    /**
     * 更新柱图数据
     * @param name 键
     * @param value 值
     */
    updateAlarmBarData(name: string, value: number) {
        const prev = getState().alarmBarData;
        prev[name] = value;
        setState({ alarmBarData: { ...prev } });
    }
});

export { alarmChart };