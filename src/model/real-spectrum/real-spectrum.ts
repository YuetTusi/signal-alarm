import dayjs from 'dayjs';
import { message } from "antd";
import { log } from "@/utility/log";
import { helper } from "@/utility/helper";
import { request } from "@/utility/http";
import { ComDevice } from "@/schema/com-device";
import { RealSpectrumState } from ".";
import { GetState, SetState } from "..";

const realSpectrum = (setState: SetState, _: GetState): RealSpectrumState => ({
    /**
     * 设备下拉数据
     */
    realSpectrumDeviceList: [],
    /**
     * 实时数据
     */
    realSpectrumData: [],
    /**
     * 比对数据
     */
    compareSpectrumData: [],
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
     * 比较中
     */
    comparing: false,
    /**
     * 更新比对中
     */
    setComparing(payload: boolean) {
        setState({ comparing: payload });
    },
    /**
     * 清空比对及实时数据
     */
    clearSpectrumData() {
        setState({
            realSpectrumData: [],
            compareSpectrumData: [],
            realSpectrumCaptureTime: 0,
            realSpectrumDeviceId: ''
        });
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
                        realSpectrumData: new Array(7499).map(() => '-') as any[],
                        realSpectrumCaptureTime: 0,
                        realSpectrumDeviceId: deviceId,
                        compareSpectrumData: undefined
                    });
                } else {
                    const next: any[] = typeof res.data.dbArray === 'string' ? JSON.parse(res.data.dbArray) : res.data.dbArray;
                    setState({
                        realSpectrumData: next.map(item => item === 0 ? '-' : item),
                        realSpectrumCaptureTime: Number.parseInt(res.data.captureTime),
                        realSpectrumDeviceId: deviceId,
                        compareSpectrumData: undefined
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
     * @param freqBaseId 背景频谱id
     * @param cmpName 比较名称
     */
    async startRealCompare(freqBaseId: string, cmpName: string) {
        const url = `/freq/start-cmp-realtime?freqBaseId=${freqBaseId}&cmpName=${encodeURIComponent(cmpName)}`;
        // const url = `/freq/start-cmp-realtime?freqBaseId=1704679178101649409&cmpName=${encodeURIComponent(cmpName)}`;
        try {
            const res = await request.get<any>(url);
            if (res !== null && res.code === 200) {
                setState({ comparing: true });
                return true;
            } else {
                message.destroy();
                message.warning('频谱比对失败');
                return false;
            }
        } catch (error) {
            log.error(`开始实时频谱比对失败@model/real-spectrum/startRealCompare('${freqBaseId}','${cmpName}'):${error.message}`);
            return false;
        }
    },
    /**
     * 停止实时频谱比对
     * @param freqBaseId 背景频谱id
     * @param cmpName 比较名称
     */
    async stopRealCompare(freqBaseId: string, cmpName: string) {
        const url = `/freq/stop-cmp-realtime?freqBaseId=${freqBaseId}&cmpName=${encodeURIComponent(cmpName)}`;
        // const url = `/freq/stop-cmp-realtime?freqBaseId=1704679178101649409&cmpName=${encodeURIComponent(cmpName)}`;
        try {
            const res = await request.get<any>(url);
            if (res !== null && res.code === 200) {
                setState({ comparing: false });
                return true;
            } else {
                message.destroy();
                message.warning('操作失败');
                return false;
            }
        } catch (error) {
            log.error(`停止实时频谱比对失败@model/real-spectrum/stopRealCompare('${freqBaseId}','${cmpName}'):${error.message}`);
            return false;
        }
    },
    /**
     * 查询实时比对数据
     * @param deviceId 设备id
     * @param cmpName 比较名称
     */
    async queryCompareRealSpectrum(deviceId: string, cmpName: string) {
        const realUrl = `/freq/real-time?deviceId=${deviceId}`;
        const compareUrl = `/freq/get-cmp-res?cmpName=${encodeURIComponent(cmpName)}&captureTime=${dayjs().unix()}`;

        // const compareUrl = `/freq/get-cmp-res?cmpName=${encodeURIComponent('历史比对测试1111')}&captureTime=${1694974384}`;
        try {
            const [real, compare] = await Promise.all([
                request.get(realUrl),
                request.get(compareUrl)
            ]);
            if (real === null || compare === null) {
                return;
            }

            if (real.code === 200) {
                const dbArray: number[] = typeof real.data?.dbArray === 'string'
                    ? JSON.parse(real.data.dbArray)
                    : real.data.dbArray;
                setState({
                    realSpectrumData: dbArray.length === 0
                        ? new Array(7499).fill('-') as any[]
                        : dbArray.map(item => item === 0 ? '-' : item)
                }); //如果实时数据为空，则将每个空坐标点填满图表
            } else {
                setState({
                    realSpectrumData: new Array(7499).fill('-') as any[]
                });
            }
            if (compare.code === 200) {
                const dbArray: number[] = typeof compare.data?.dbArray === 'string'
                    ? JSON.parse(compare.data.dbArray)
                    : real.data.dbArray;
                setState({
                    compareSpectrumData: dbArray.length === 0
                        ? new Array(7499).fill('-') as any[]
                        : dbArray.map(item => item === 0 ? '-' : item)
                });
            } else {
                setState({
                    compareSpectrumData: new Array(7499).fill('-') as any[]
                });
            }
        } catch (error) {
            console.warn(error);
            log.error(`查询频谱比对结果失败@model/real-spectrum/queryCompareRealSpectrum('${deviceId}','${cmpName}'):${error.message}`);
        }
    }
});

export { realSpectrum };