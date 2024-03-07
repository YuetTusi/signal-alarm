import { Locate } from '@/schema/locate';
import { pointLocate } from './point-locate';

/**
 * 多点定位
 */
interface PointLocateState {
    /**
     * 多点定位数据
     */
    pointLocates: Locate[],
    /**
     * 增加多点定位数据
     * 由SSE推送，追加显示
     */
    appendPointLocate: (payload: Locate) => void,
    /**
     * 删除某时刻的点
     * @param time 时间值
     */
    removePointByTime: (time: number) => void
}

export type { PointLocateState };
export { pointLocate };