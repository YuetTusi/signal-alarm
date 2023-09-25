import dayjs from 'dayjs';
import { log } from "@/utility/log";
import { helper } from "@/utility/helper";
import { request } from "@/utility/http";
import { ComDevice } from "@/schema/com-device";
import { QueryPage } from "@/schema/query-page";
import { BaseFreq } from '@/schema/base-freq';
import { BaseSpectrumState } from ".";
import { GetState, SetState } from "..";

const baseSpectrum = (setState: SetState, _: GetState): BaseSpectrumState => ({
    /**
     * 设备下拉数据
     */
    baseSpectrumDeviceList: [],
    /**
     * 背景频谱数据
     */
    baseSpectrumData: [],
    /**
     * 当前页
     */
    baseSpectrumPageIndex: 1,
    /**
     * 页尺寸
     */
    baseSpectrumPageSize: helper.PAGE_SIZE,
    /**
     * 总数
     */
    baseSpectrumTotal: 0,
    /**
     * 时间
     */
    baseSpectrumCaptureTime: 0,
    /**
     * 设备id
     */
    baseSpectrumDeviceId: '',
    /**
     * 读取状态
     */
    baseSpectrumLoading: false,
    /**
     * 清空背景频谱数据
     */
    clearBaseSpectrumData() {
        setState({
            baseSpectrumData: [],
            baseSpectrumCaptureTime: 0,
            baseSpectrumDeviceId: '',
            baseSpectrumLoading: false
        });
    },
    /**
     * 查询设备下拉数据
     */
    async queryBaseSpectrumDeviceList() {
        try {
            const res = await request.get<ComDevice[]>('/devops/device/list');
            if (res === null) {
                setState({ baseSpectrumDeviceList: [] });
                return;
            }
            if (res.code === 200) {
                setState({ baseSpectrumDeviceList: res.data });
            } else {
                setState({ baseSpectrumDeviceList: [] });
            }
        } catch (error) {
            log.error(`查询设备下拉失败@model/history-spectrum/queryHistorySpectrumDeviceList():${error.message}`);
        }
    },
    /**
     * 查询当前设备背景频谱数据
     */
    async queryBaseSpectrumData(pageIndex: number, pageSize: number, condition?: Record<string, any>) {
        setState({ baseSpectrumLoading: true });
        let params: string[] = [];
        if (condition?.baseFreqName) {
            params.push(`baseFreqName=${window.encodeURIComponent(condition.baseFreqName)}`);
        }
        if (condition?.deviceId && condition.deviceId !== '-1') {
            params.push(`deviceId=${condition.deviceId}`);
        }
        if (condition?.createTimeBegin) {
            params.push(`createTimeBegin=${condition.createTimeBegin}`);
        }
        if (condition?.createTimeEnd) {
            params.push(`createTimeEnd=${condition.createTimeEnd}`);
        }
        const q = '?' + params.join('&');
        try {
            const res = await request.get<QueryPage<BaseFreq>>(`/freq/get-base-freq-list/${pageIndex}/${pageSize}${q}`);
            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<BaseFreq>>(`/freq/get-base-freq-list/${res.data.pages}/${pageSize}${q}`);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        baseSpectrumData: ret.data.records.sort((a, b) =>
                            dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                        baseSpectrumPageIndex: pageIndex,
                        baseSpectrumPageSize: pageSize,
                        baseSpectrumTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    baseSpectrumData: res.data.records.sort((a, b) =>
                        dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                    baseSpectrumPageIndex: pageIndex,
                    baseSpectrumPageSize: pageSize,
                    baseSpectrumTotal: res.data.total
                });
            }
        } catch (error) {
            console.warn(error);
            log.error(`查询历史频谱数据失败@model/history-spectrum/queryHistorySpectrumData():${error.message}`);
        } finally {
            setState({ baseSpectrumLoading: false });
        }
    },
});

export { baseSpectrum };