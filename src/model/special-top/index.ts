import { Protocol } from '@/schema/protocol';
import { SpecialBase } from "@/schema/special-base";
import { specialTop } from './special-top';

interface SpecialTopState {

    /**
     * （热像头，手机信号等）Top10数据
     */
    specialWapTopData: SpecialBase[],
    /**
     * 热点Top10数据
     */
    specialHotsportTopData: SpecialBase[],
    /**
     * 终端Top10数据
     */
    specialTerminalTopData: SpecialBase[],
    /**
     * 加载状态
     */
    specialTopLoading: boolean,
    /**
     * 返回全部Top10数据
     */
    getAllTopData: () => SpecialBase[],
    /**
     * 查询热像头，手机信号等Top10数据
     */
    querySpecialWapTopData: (type: Protocol[]) => void,
    /**
     * 查询热点Top10数据
     */
    querySpecialHotspotTopData: (type: Protocol[]) => void,
    /**
     * 查询终端Top10数据
     */
    querySpecialTerminalTopData: (type: Protocol[]) => void
}

export type { SpecialTopState };
export { specialTop };