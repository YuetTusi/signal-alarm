import { GetState, SetState } from '..';
import { AlarmChartState } from '../alarm-chart';

const alarmChart = (setState: SetState, getState: GetState): AlarmChartState => ({

    /**
     * 报警柱图数据
     * X轴固定为12个
     */
    alarmBarData: {
        "移动/联通(2G/4G-B8)": { rssi: null, captureTime: '' },
        "移动/联通(2G),全制式(4G-B3)": { rssi: null, captureTime: '' },
        "电信(2G/3G/4G-B5)": { rssi: null, captureTime: '' },
        "联通(3G),联通/电信(4G-B1/N1)": { rssi: null, captureTime: '' },
        "移动(4G-B34)": { rssi: null, captureTime: '' },
        "移动/广电(4G-B39)": { rssi: null, captureTime: '' },
        "移动/广电(4G-B40)": { rssi: null, captureTime: '' },
        "移动/广电(4G-B41/5G-N41)": { rssi: null, captureTime: '' },
        "移动/广电(5G-N28)": { rssi: null, captureTime: '' },
        "联通/电信(5G-N77)": { rssi: null, captureTime: '' },
        "联通/电信(5G-N78)": { rssi: null, captureTime: '' },
        "移动/广电(5G-N79)": { rssi: null, captureTime: '' }
    },
    /**
     * 更新柱图数据
     * @param name 键
     * @param value 值
     */
    updateAlarmBarData(name: string, value: { rssi: number | null, captureTime: string }) {
        const prev = getState().alarmBarData;
        prev[name] = value;
        setState({ alarmBarData: { ...prev } });
    }
});

export { alarmChart };