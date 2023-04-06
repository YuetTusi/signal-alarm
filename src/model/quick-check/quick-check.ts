import dayjs from 'dayjs';
import { request } from '@/utility/http';
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
     * 设置开始时间
     */
    setStartTime(start: string) {
        setState({ startTime: start });
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
        } catch (error) {
            console.warn(error);
        } finally {
            setState({ startTime: '' });
            setState({ quickCheckLoading: false });
        }
    }
});

export { quickCheck };