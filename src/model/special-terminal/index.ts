import { Terminal } from "@/schema/terminal";
import { specialTerminal } from './special-terminal';

/**
 * 专项数据（终端）
 */
interface SpecialTerminalState {

    /**
     * 分页数据
     */
    specialTerminalData: Terminal[],
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
     * 查询专项检查（终端）分页数据
     */
    querySpecialTerminalData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 导出专项检查（终端）数据
     */
    exportSpecialTerminalData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => Promise<Buffer>
}

export type { SpecialTerminalState };
export { specialTerminal };