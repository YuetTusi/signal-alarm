import { message } from "antd";
import { log } from "@/utility/log";
import { helper } from "@/utility/helper";
import { request } from "@/utility/http";
import { ComDevice } from "@/schema/com-device";
import { FreqCompare } from '@/schema/freq-compare';
import { SpecOperate } from '@/view/spectrum/prop';
import { RealSpectrumState } from ".";
import { GetState, SetState } from "..";

const realSpectrum = (setState: SetState, getState: GetState): RealSpectrumState => ({
    /**
     * 设备下拉数据
     */
    realSpectrumDeviceList: [],
    /**
     * 实时数据
     */
    realSpectrumData: [],
    /**
     * 所有背景频谱数据
     */
    allFreqList: [],
    /**
     * 背景频谱
     */
    bgSpectrumData: [],
    /**
     * 比较数据
     */
    // freqCmpResList: [],
    /**
     * 比对频谱柱图数据
     */
    compareBarData: [],
    /**
     * 比较展示数据（表格）
     */
    freqComDisplayList: [],
    /**
     * 时间
     */
    realSpectrumCaptureTime: 0,
    /**
     * 设备id
     */
    realSpectrumDeviceId: '',
    /**
     * 读取状态
     */
    realSpectrumLoading: false,
    /**
     * 操作类型（0:未执行操作,1:查询,2:为比对）
     */
    specOperate: SpecOperate.Nothing,
    /**
     * 正在查询中
     */
    specLiving: false,
    /**
     * 重置柱图数据
     */
    resetCompareBarData() {
        const data: { currentOffsetSignal: number | undefined, itemStyle: any }[] = [];
        for (let i = 0; i < 7499; i++) {
            data.push({ currentOffsetSignal: undefined, itemStyle: { color: '#008000' } });
        }
        setState({ compareBarData: data });
    },
    /**
     * 更新操作类型
     */
    setSpecOperate(payload: SpecOperate) {
        setState({ specOperate: payload });
    },
    /**
     * 更新比对中
     */
    setSpecLiving(payload: boolean) {
        setState({ specLiving: payload });
    },
    /**
     * 清空比对及实时数据
     */
    clearSpectrumData() {
        setState({
            realSpectrumData: [],
            bgSpectrumData: [],
            realSpectrumCaptureTime: 0,
            realSpectrumDeviceId: ''
        });
    },
    /**
     * 清空背景频谱
     */
    clearBgSpectrumData() {
        setState({ bgSpectrumData: [] });
    },
    /**
     * 查询所有背景频谱数据
     */
    async queryAllFreqList() {
        const url = '/freq/get-all-freq-list';
        try {
            const res = await request.get<{
                freqBaseId: string,
                freqArray: string,
                deviceId: string
            }[]
            >(url);
            if (res !== null && res.code === 200) {
                setState({ allFreqList: res.data });
            } else {
                setState({ allFreqList: [] });
            }
        } catch (error) {
            setState({ allFreqList: [] });
            log.error(`查询设备下拉失败@model/real-spectrum/queryAllFreqList():${error.message}`);
        }
    },
    /**
     * 查询设备下拉数据
     */
    async queryRealSpectrumDeviceList() {
        try {
            const res = await request.get<ComDevice[]>('/devops/device/list');
            if (res === null) {
                setState({ realSpectrumDeviceList: [] });
                return;
            }
            if (res.code === 200) {
                setState({ realSpectrumDeviceList: res.data });
            } else {
                setState({ realSpectrumDeviceList: [] });
            }
        } catch (error) {
            log.error(`查询设备下拉失败@model/real-spectrum/queryRealSpectrumDeviceList():${error.message}`);
        }
    },
    /**
     * 查询当前设备实时频谱数据
     * @param deviceId  设备id
     */
    async queryRealSpectrumData(deviceId: string) {
        setState({ realSpectrumLoading: true });
        const url = `/freq/real-time?deviceId=${deviceId}`;
        try {
            const res = await request.get<{
                captureTime: string,
                dbArray: string,
                deviceId: string
            }>(url);

            if (res !== null && res.code === 200) {
                if (helper.isNullOrUndefined(res.data)) {
                    setState({
                        realSpectrumData: new Array(7499).map<any>(() => '-'),
                        realSpectrumCaptureTime: 0,
                        realSpectrumDeviceId: deviceId,
                        bgSpectrumData: undefined
                    });
                } else {
                    const next: any[] = typeof res.data.dbArray === 'string' ? JSON.parse(res.data.dbArray) : res.data.dbArray;
                    setState({
                        realSpectrumData: next.map(item => item === 0 ? '-' : item),
                        realSpectrumCaptureTime: Number.parseInt(res.data.captureTime),
                        realSpectrumDeviceId: deviceId,
                        bgSpectrumData: undefined
                    });
                }
            } else if (res !== null && res.code === 201) {
                throw new Error(res.data as any);
            } else {
                setState({ realSpectrumData: [] });
            }
        } catch (error) {
            log.error(`查询实时频谱数据失败@model/real-spectrum/queryRealSpectrumData('${deviceId}'):${error.message}`);
            throw error;
        } finally {
            setState({ realSpectrumLoading: false });
        }
    },
    /**
     * 开始实时频谱比对
     * @param deviceId 设备id
     * @param freqBaseId 背景频谱id
     * @param offset 偏移量
     */
    async startRealCompare(deviceId: string, freqBaseId: string, offset: number) {
        const url = `/freq/start-cmp-realtime?deviceId=${deviceId}&freqBaseId=${freqBaseId}&offset=${offset}`;
        try {
            const res = await request.get<{
                freqCmpResList: FreqCompare[],
                currentArray: string,
                baseArray: string
            }>(url);

            if (res !== null && res.code === 200) {
                const cmp = getState().allFreqList.find(i => i.freqBaseId === freqBaseId);
                //找到当前背景频谱数据
                let bgList = cmp === undefined ? [] : JSON.parse(cmp.freqArray ?? '[]') as number[];

                const prev = getState().compareBarData;
                const realData = JSON.parse(res.data.currentArray ?? '[]') as number[];
                const bar = realData.map((_, index) => {
                    const has = res.data.freqCmpResList.find(j => j.freq === index); //找到实时x轴索引与比对频率一致的数据
                    if (has === undefined) {
                        return prev[index];
                    }

                    if (prev[index].currentOffsetSignal === undefined || has.currentOffsetSignal > prev[index].currentOffsetSignal!) {
                        //如果偏移值比之前大，才更新
                        const modify: any = { currentOffsetSignal: has.currentOffsetSignal };
                        if (has.currentOffsetSignal >= 10 && has.currentOffsetSignal <= 20) {
                            modify.itemStyle = { color: '#f6e58d', borderWidth: 10 };
                        } else if (has.currentOffsetSignal > 20) {
                            modify.itemStyle = { color: '#FF0000', borderWidth: 10 };
                        } else {
                            modify.itemStyle = { color: '#008000' };
                        }
                        return modify;
                    } else {
                        return prev[index];
                    }
                });

                setState({
                    realSpectrumData: realData,//实时曲线数据
                    bgSpectrumData: bgList, // 背景频谱，黄色对比曲线
                    freqComDisplayList: res.data.freqCmpResList, //频谱表格数据
                    compareBarData: bar.map((item, index) => ({
                        ...prev[index],
                        ...item
                    }))
                });
                return true;
            } else if (res !== null && res.code === 201) {
                throw new Error(res.data as any);
            } else {
                return false;
            }
        } catch (error) {
            setState({
                realSpectrumData: []
            });
            log.error(`开始实时频谱比对失败@model/real-spectrum/startRealCompare('${deviceId}','${freqBaseId}',${offset}):${error.message}`);
            throw error;
        }
    },
    /**
     * 停止实时频谱比对
     * @param deviceId 设备id
     * @param freqBaseId 背景频谱id
     */
    async stopRealCompare(deviceId: string, freqBaseId: string) {
        const url = `/freq/stop-cmp-realtime?deviceId=${deviceId}&freqBaseId=${freqBaseId}`;
        if (getState().specOperate !== SpecOperate.Compare) {
            return false;
        }
        try {
            const res = await request.get<any>(url);
            if (res !== null && res.code === 200) {
                setState({ specLiving: false });
                return true;
            } else {
                message.destroy();
                message.warning('操作失败');
                return false;
            }
        } catch (error) {
            log.error(`停止实时频谱比对失败@model/real-spectrum/stopRealCompare('${deviceId}','${freqBaseId}'):${error.message}`);
            return false;
        }
    }
});

export { realSpectrum };