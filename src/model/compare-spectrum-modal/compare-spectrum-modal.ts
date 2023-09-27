import { BaseFreq } from '@/schema/base-freq';
import { QueryPage } from '@/schema/query-page';
import { request } from '@/utility/http';
import { CompareSpectrumModalState } from '.'
import { SetState, GetState } from '..';

const compareSpectrumModal = (setState: SetState, _: GetState): CompareSpectrumModalState => ({

    /**
     * 背景频谱数据（当前设备的数据）
     */
    compareBaseSpectrumData: [],
    /**
     * 读取中
     */
    compareBaseSpectrumLoading: false,
    /**
     * 更新背景频谱数据
     */
    setCompareBaseSpectrumData(payload: BaseFreq[]) {
        setState({ compareBaseSpectrumData: payload });
    },
    /**
     * 按设备id查询背景频谱
     */
    async queryBaseSpectrumDataByDeviceId(deviceId: string) {
        const url = `/freq/get-base-freq-list/1/100000?deviceId=${deviceId}`;
        setState({ compareBaseSpectrumLoading: true });
        try {
            const res = await request.get<QueryPage<BaseFreq>>(url);
            if (res !== null && res.code === 200) {
                setState({ compareBaseSpectrumData: res.data.records });
            } else {
                setState({ compareBaseSpectrumData: [] });
            }
        } catch (error) {
            console.warn(error);
        } finally {
            setState({ compareBaseSpectrumLoading: false });
        }
    }
});

export { compareSpectrumModal };