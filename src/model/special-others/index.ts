import { Wap } from "@/schema/wap";
import { specialOthers } from './special-others';

/**
 * 专项数据（摄像头，手机信号等）
 */
interface SpecialOthersState {

    /**
     * 分页数据
     */
    specialOthersData: Wap[],
    /**
     * 当前页
     */
    specialOthersPageIndex: number,
    /**
     * 分页尺寸
     */
    specialOthersPageSize: number,
    /**
     * 总数
     */
    specialOthersTotal: number,
    /**
     * 加载中
     */
    specialOthersLoading: boolean,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setSpecialOthersLoading: (payload: boolean) => void,
    /**
     * 更新分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setSpecialOthersPage: (pageIndex: number, pageSize: number, total: number) => void,
    /**
     * 查询专项检查（摄像头，手机信号，其他等）分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    querySpecialOthersData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 导出
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    exportSpecialOthersData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => Promise<Buffer>
}

export type { SpecialOthersState };
export { specialOthers };