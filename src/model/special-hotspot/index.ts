import { Hotspot } from "@/schema/hotspot";
import { specialHotspot } from './special-hotspot';

/**
 * 专项数据（热点）
 */
interface SpecialHotspotState {

    /**
     * 分页数据
     */
    specialHotspotData: Hotspot[],
    /**
     * 当前页
     */
    specialHotspotPageIndex: number,
    /**
     * 分页尺寸
     */
    specialHotspotPageSize: number,
    /**
     * 总数
     */
    specialHotspotTotal: number,
    /**
     * 加载中
     */
    specialHotspotLoading: boolean,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setSpecialHotspotLoading: (payload: boolean) => void,
    /**
     * 更新分页数据
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setSpecialHotspotPage: (pageIndex: number, pageSize: number, total: number) => void,
    /**
     * 查询专项检查（热点）分页数据
     * @param protocal 类型
     */
    querySpecialHotspotData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 导出专项检查（热点）数据
     * @param protocal 类型
     */
    exportSpecialHotspotData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => Promise<Buffer>
}

export type { SpecialHotspotState };
export { specialHotspot };