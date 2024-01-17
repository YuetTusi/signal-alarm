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
    freqCmpResList: [],
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
            } else {
                setState({ realSpectrumData: [] });
            }
        } catch (error) {
            log.error(`查询实时频谱数据失败@model/real-spectrum/queryRealSpectrumData('${deviceId}'):${error.message}`);
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
                let bgList = cmp === undefined ? [] : JSON.parse(cmp.freqArray) as number[];
                const realSpectrumData = JSON.parse(res.data.currentArray) as number[];
                const display = realSpectrumData.reduce((acc, _, index) => {
                    const has = res.data.freqCmpResList.find(item =>
                        Math.trunc(1 + item.freq * 0.8) === index);
                    if (has) {
                        acc.push(has);
                    }
                    return acc;
                }, [] as FreqCompare[]);
                setState({
                    freqCmpResList: res.data.freqCmpResList,
                    realSpectrumData: JSON.parse(res.data.currentArray),
                    bgSpectrumData: bgList, // 背景频谱，黄色对比曲线
                    freqComDisplayList: display
                });
                return true;
            } else if (res?.code === 201) {
                message.warning(res?.message ?? '频谱比对失败');
                return false;
            } else {
                return false;
            }
        } catch (error) {
            setState({
                realSpectrumData: [],
                freqCmpResList: []
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