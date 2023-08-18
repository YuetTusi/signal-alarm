import { Wap } from "@/schema/wap";
import { specialWiretap } from './special-wiretap';

/**
 * 专项数据（窃听器）
 */
interface SpecialWiretapState {

    /**
     * 分页数据
     */
    specialWiretapData: Wap[],
    /**
     * 当前页
     */
    specialWiretapPageIndex: number,
    /**
     * 分页尺寸
     */
    specialWiretapPageSize: number,
    /**
     * 总数
     */
    specialWiretapTotal: number,
    /**
     * 加载中
     */
    specialWiretapLoading: boolean,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setSpecialWiretapLoading: (payload: boolean) => void,
    /**
     * 更新分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setSpecialWiretapPage: (pageIndex: number, pageSize: number, total: number) => void,
    /**
     * 查询专项检查（摄像头，手机信号，其他等）分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    querySpecialWiretapData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 导出
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    exportSpecialWiretapData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => Promise<Buffer>
}

export type { SpecialWiretapState };
export { specialWiretap };