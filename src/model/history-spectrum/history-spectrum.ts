import { ComDevice } from "@/schema/com-device";
import { HistorySpectrumState } from ".";
import { GetState, SetState } from "..";
import { helper } from "@/utility/helper";
import { request } from "@/utility/http";
import { log } from "@/utility/log";

const historySpectrum = (setState: SetState, _: GetState): HistorySpectrumState => ({
    /**
     * 设备下拉数据
     */
    historySpectrumDeviceList: [],
    /**
     * 实时数据
     */
    historySpectrumData: [],
    /**
     * 时间
     */
    historySpectrumCaptureTime: 0,
    /**
     * 设备id
     */
    historySpectrumDeviceId: '',
    /**
     * 读取状态
     */
    historySpectrumLoading: false,
    /**
     * 清空历史频谱数据
     */
    clearHistorySpectrumData() {
        setState({
            historySpectrumData: [],
            historySpectrumCaptureTime: 0,
            historySpectrumDeviceId: '',
            historySpectrumLoading: false
        });
    },
    /**
     * 查询设备下拉数据
     */
    async queryHistorySpectrumDeviceList() {
        try {
            const res = await request.get<ComDevice[]>('/devops/device/list');
            if (res === null) {
                setState({ historySpectrumDeviceList: [] });
                return;
            }
            if (res.code === 200) {
                setState({ historySpectrumDeviceList: res.data });
            } else {
                setState({ historySpectrumDeviceList: [] });
            }
        } catch (error) {
            log.error(`查询设备下拉失败@model/history-spectrum/queryHistorySpectrumDeviceList():${error.message}`);
        }
    },
    /**
     * 查询当前设备实时频谱数据
     * @param deviceId  设备id
     * @param time 时间戳
     */
    async queryHistorySpectrumData(deviceId: string, captureTime: number) {
        setState({ historySpectrumLoading: true });
        const url = `/freq/history?deviceId=${deviceId}&captureTime=${captureTime}`;
        try {
            const res = await request.get<{
                captureTime: string,
                dbArray: string, //是一个字符串数组
                deviceId: string
            }>(url);

            if (res !== null && res.code === 200) {
                setState({
                    historySpectrumData: typeof res.data?.dbArray === 'string' ? JSON.parse(res.data.dbArray) : (res.data?.dbArray ?? []),
                    historySpectrumCaptureTime: res.data?.captureTime === undefined ? 0 : Number.parseInt(res.data.captureTime),
                    historySpectrumDeviceId: res.data?.deviceId ?? ''
                });
            } else {
                setState({ historySpectrumData: [] });
            }
        } catch (error) {
            console.warn(error);
            log.error(`查询历史频谱数据失败@model/history-spectrum/queryHistorySpectrumData():${error.message}`);
        } finally {
            setState({ historySpectrumLoading: false });
        }
    }
});

export { historySpectrum };