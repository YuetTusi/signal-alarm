import dayjs from 'dayjs';
import { request } from '@/utility/http';
import { QuickCheckReport } from '@/schema/quick-check-report';
import { GetState, SetState } from '../index';
import { QuickCheckState } from '../quick-check';

const quickCheck = (setState: SetState, _: GetState): QuickCheckState => ({
    /**
     * 等待状态
     */
    quickCheckLoading: false,
    /**
     * 开始时间
     */
    startTime: '',
    /**
     * 报告列表
     */
    quickCheckReportList: [],
    /**
     * 设置开始时间
     */
    setStartTime(start: string) {
        setState({ startTime: start });
    },
    /**
     * 更新报告列表
     */
    setQuickCheckReportList(list: QuickCheckReport[]) {
        setState({ quickCheckReportList: list })
    },
    /**
     * 开始检测
     */
    async quickCheckStart() {
        setState({ quickCheckLoading: true });
        try {
            await request.get('/check/start');
            setState({ startTime: dayjs().format('YYYY-MM-DD HH:mm:ss') });
        } catch (error) {
            console.warn(error);
        } finally {
            setState({ quickCheckLoading: false });
        }
    },
    /**
     * 停止检测
     */
    async quickCheckStop() {
        setState({ quickCheckLoading: true });
        try {
            await request.get('/check/stop');
            await this.queryQuickCheckReport();
        } catch (error) {
            console.warn(error);
        } finally {
            setState({ startTime: '' });
            setState({ quickCheckLoading: false });
        }
    },
    /**
     * 查询检查报告
     */
    async queryQuickCheckReport() {
        try {
            const res = await request.get<QuickCheckReport[]>('/check/list');
            if (res !== null && res.code === 200) {
                setState({ quickCheckReportList: res.data ?? [] });
            }
        } catch (error) {
            throw error;
        }
    }
});

export { quickCheck };