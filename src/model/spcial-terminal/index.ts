import { Wap } from "@/schema/wap";
import { specialTerminal } from './special-terminal';

/**
 * 专项数据（终端）
 */
interface SpecialTerminalState {

    /**
     * Top10数据
     */
    specialTerminalTop10Data: Wap[],
    /**
     * 分页数据
     */
    specialTerminalData: Wap[],
    /**
     * 当前页
     */
    specialTerminalPageIndex: number,
    /**
     * 分页尺寸
     */
    specialTerminalPageSize: number,
    /**
     * 总数
     */
    specialTerminalTotal: number,
    /**
     * 加载中
     */
    specialTerminalLoading: boolean,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setSpecialTerminalLoading: (payload: boolean) => void,
    /**
     * 更新分页数据
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setSpecialTerminalPage: (pageIndex: number, pageSize: number, total: number) => void,
    /**
     * 查询专项检查（摄像头，手机信号，其他等）Top10数据
     * @param protocal 类型
     */
    querySpecialTerminalTop10Data: () => void,
    /**
     * 查询专项检查（摄像头，手机信号，其他等）分页数据
     * @param protocal 类型
     */
    querySpecialTerminalData: (pageIndex: number, pageSize: number) => void
}

export type { SpecialTerminalState };
export { specialTerminal };