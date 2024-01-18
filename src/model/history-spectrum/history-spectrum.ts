import { log } from "@/utility/log";
import { helper } from "@/utility/helper";
import { request } from "@/utility/http";
import { ComDevice } from "@/schema/com-device";
import { PastOperate } from "@/view/spectrum/prop";
import { HistorySpectrumState } from ".";
import { GetState, SetState } from "..";

const historySpectrum = (setState: SetState, _: GetState): HistorySpectrumState => ({
    /**
     * 操作类型
     */
    pastOperate: PastOperate.Nothing,
    /**
     * 正在播放中
     */
    specPlaying: false,
    /**
     * 设备下拉数据
     */
    historySpectrumDeviceList: [],
    /**
     * 历史数据
     */
    historySpectrumData: [],
    /**
     * 
     */
    allBgFreqList: [],
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
     * 更新操作类型
     */
    setPastOperate(payload: PastOperate) {
        setState({ pastOperate: payload });
    },
    /**
     * 更新播放中
     */
    setSpecPlaying(payload: boolean) {
        setState({ specPlaying: payload });
    },
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
     * 查询所有背景频谱数据
     */
    async queryAllBgFreqList() {
        const url = '/freq/get-all-freq-list';
        try {
            const res = await request.get<{
                freqBaseId: string,
                freqArray: string,
                deviceId: string
            }[]
            >(url);
            if (res !== null && res.code === 200) {
                setState({ allBgFreqList: res.data });
            } else {
                setState({ allBgFreqList: [] });
            }
        } catch (error) {
            setState({ allBgFreqList: [] });
            log.error(`查询所有背景频谱@model/history-spectrum/queryAllBgFreqList():${error.message}`);
        }
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
                if (helper.isNullOrUndefined(res.data)) {
                    setState({
                        historySpectrumData: new Array(7499).fill('-') as any[],
                        historySpectrumCaptureTime: 0,
                        historySpectrumDeviceId: ''
                    });
                } else {
                    setState({
                        historySpectrumData: typeof res.data.dbArray === 'string' ? JSON.parse(res.data.dbArray) : res.data!.dbArray,
                        historySpectrumCaptureTime: Number.parseInt(res.data.captureTime),
                        historySpectrumDeviceId: res.data.deviceId ?? ''
                    });
                }
            } else {
                setState({ historySpectrumData: [] });
            }
        } catch (error) {
            console.warn(error);
            log.error(`查询历史频谱数据失败@model/history-spectrum/queryHistorySpectrumData():${error.message}`);
        } finally {
            setState({ historySpectrumLoading: false });
        }
    },
    /**
     * 查询历史比对数据
     * @param freqBaseId 
     * @param startTime 
     * @param endTime 
     * @param cmpName 
     */
    async queryHistoryCompareSpectrumData(freqBaseId: string, startTime: number, endTime: number, cmpName: string) {
        const url = `/freq/cmp-history?freqBaseId=${freqBaseId}&startTime=${startTime}&endTime=${endTime}&cmpName=${encodeURIComponent(cmpName)}`;

        const res = await request.get(url);

        console.log(res);
    }
});

export { historySpectrum };