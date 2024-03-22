import { log } from "@/utility/log";
import { helper } from "@/utility/helper";
import { request } from "@/utility/http";
import { ComDevice } from "@/schema/com-device";
import { FreqCompare } from "@/schema/freq-compare";
import { PastOperate } from "@/view/spectrum/prop";
import { HistorySpectrumState } from ".";
import { GetState, SetState } from "..";
import { message } from "antd";

const historySpectrum = (setState: SetState, getState: GetState): HistorySpectrumState => ({
    /**
     * 操作类型
     */
    pastOperate: PastOperate.Nothing,
    /**
     * 正在播放中
     */
    specPlaying: false,
    /**
     * 读取中
     */
    searchHistoryLoading: false,
    /**
     * 设备下拉数据
     */
    historySpectrumDeviceList: [],
    /**
     * 历史频谱数据
     */
    historySpectrumData: [],
    /**
     * 比对频谱柱图数据
     */
    historyBarData: [],
    /**
     * 所有背景频谱数据
     */
    allBgFreqList: [],
    /**
     * 比较数据
     */
    historyCmpResList: [],
    /**
     * 历史背景频谱
     */
    historyBgSpectrumData: [],
    /**
     * 比较展示数据（表格）
     */
    historyComDisplayList: [],
    /**
     * 重置比对频谱柱图数据
     */
    resetHistoryBarData() {
        const data: { currentOffsetSignal: number | undefined, itemStyle: any }[] = [];
        for (let i = 0; i < 7499; i++) {
            data.push({ currentOffsetSignal: undefined, itemStyle: { color: '#008000' } });
        }
        setState({ historyBarData: data });
    },
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
     * 更新历史背景频谱
     */
    setHistoryBgSpectrumData(payload: number[]) {
        setState({ historyBgSpectrumData: payload });
    },
    /**
    * 更新比较数据
    */
    setHistoryCmpResList(payload: FreqCompare[]) {
        setState({ historyCmpResList: payload });
    },
    /**
     * 更新比较展示数据（表格）
     */
    setHistoryComDisplayList(payload: FreqCompare[]) {
        setState({ historyComDisplayList: payload });
    },
    /**
     * 清空历史频谱数据
     */
    clearHistorySpectrumData() {
        setState({
            historySpectrumData: [],
            historyCmpResList: [],
            historyBgSpectrumData: [],
            historyComDisplayList: [],
            allBgFreqList: [],
            specPlaying: false,
            pastOperate: PastOperate.Nothing
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
     * 查询当前设备历史频谱数据
     * @param deviceId  设备id
     * @param time 时间戳
     */
    async queryHistorySpectrumData(deviceId: string, captureTime: number) {
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
                        historySpectrumData: new Array(7499).fill('-') as any[]
                    });
                } else {
                    setState({
                        historySpectrumData: typeof res.data.dbArray === 'string' ? JSON.parse(res.data.dbArray) : res.data!.dbArray
                    });
                }
            } else {
                setState({ historySpectrumData: [] });
            }
        } catch (error) {
            console.warn(error);
            log.error(`查询历史频谱数据失败@model/history-spectrum/queryHistorySpectrumData():${error.message}`);
        }
    },
    /**
     * 查询历史比对数据
     * @param deviceId 设备id
     * @param freqBaseId 背景频谱id
     * @param startTime 起始时间
     * @param endTime 结束时间
     * @param offset 偏移值
     */
    async queryHistoryCompareSpectrumData(
        deviceId: string, freqBaseId: string,
        startTime: number, endTime: number, offset: number) {

        const url = `/freq/cmp-history?deviceId=${deviceId}&freqBaseId=${freqBaseId}&startTime=${startTime}&endTime=${endTime}&offset=${offset}`;

        try {
            setState({ searchHistoryLoading: true });
            const res = await request.get<{
                freqCmpResList: FreqCompare[],
                currentArray: string,
                baseArray: string
            }>(url);
            if (res !== null && res.code === 200) {
                // const prev = getState().historyBarData;
                // const historySpectrumData = getState().historySpectrumData;
                const cmp = getState().allBgFreqList.find(i => i.freqBaseId === freqBaseId);
                //找到当前背景频谱数据
                let bgList = cmp === undefined ? [] : JSON.parse(cmp.freqArray ?? '[]') as number[];

                // const bar = historySpectrumData.map((_, index) => {
                //     const has = res.data.freqCmpResList.find(j => j.freq === index); //找到实时x轴索引与比对频率一致的数据
                //     if (has === undefined) {
                //         return prev[index];
                //     }

                //     if (prev[index].currentOffsetSignal === undefined || has.currentOffsetSignal > prev[index].currentOffsetSignal!) {
                //         //如果偏移值比之前大，才更新
                //         const modify: any = { currentOffsetSignal: has.currentOffsetSignal };
                //         if (has.currentOffsetSignal >= 10 && has.currentOffsetSignal <= 20) {
                //             modify.itemStyle = { color: '#FFA500' };
                //         } else if (has.currentOffsetSignal > 20) {
                //             modify.itemStyle = { color: '#FF0000' };
                //         } else {
                //             modify.itemStyle = { color: '#008000' };
                //         }
                //         return modify;
                //     } else {
                //         return prev[index];
                //     }
                // });

                setState({
                    historyCmpResList: res.data.freqCmpResList,
                    historyBgSpectrumData: bgList, // 背景频谱，黄色对比曲线
                    // historyBarData: bar.map((item, index) => ({
                    //     ...prev[index],
                    //     ...item
                    // }))
                });
                return true;
            } else if (res?.code === 201) {
                message.warning(res.data as any);
                return false;
            } else {
                return false;
            }
        } catch (error) {
            console.warn(error);
            throw error;
        } finally {
            setState({ searchHistoryLoading: false });
        }
    }
});

export { historySpectrum };