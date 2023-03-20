import { Wap } from "@/schema/wap";
import { Dayjs } from "dayjs";
import { specialWap } from './special-wap';

/**
 * 专项数据（摄像头，手机信号等）
 */
interface SpecialWapState {

    /**
     * Top10数据
     */
    specialWapTop10Data: Wap[],
    /**
     * 分页数据
     */
    specialWapData: Wap[],
    /**
     * 当前页
     */
    specialWapPageIndex: number,
    /**
     * 分页尺寸
     */
    specialWapPageSize: number,
    /**
     * 总数
     */
    specialWapTotal: number,
    /**
     * 加载中
     */
    specialWapLoading: boolean,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setSpecialWapLoading: (payload: boolean) => void,
    /**
     * 更新分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setSpecialWapPage: (pageIndex: number, pageSize: number, total: number) => void,
    /**
     * 查询专项检查（摄像头，手机信号，其他等）Top10数据
     */
    querySpecialWapTop10Data: () => void,
    /**
     * 查询专项检查（摄像头，手机信号，其他等）分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    querySpecialWapData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 导出
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    exportSpecialWapData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => Promise<Buffer>
}

export type { SpecialWapState };
export { specialWap };