import { Zone as ZoneEntity } from '@/schema/zone';
import { zone } from './zone';
import { RequestResult } from '@/utility/http';

interface ZoneState {
    /**
     * 全部区域数据（列表）
     */
    zoneList: ZoneEntity[],
    /**
     * 区域数据
     */
    zoneData: ZoneEntity[],
    /**
     * 页码
     */
    zonePageIndex: number,
    /**
     * 页尺寸
     */
    zonePageSize: number,
    /**
     * 总数
     */
    zoneTotal: number,
    /**
     * 读取中
     */
    zoneLoading: boolean,
    /**
     * 添加区域
     */
    addZone: (payload: ZoneEntity) => Promise<RequestResult<any> | null>,
    /**
     * 更新区域
     */
    updateZone: (payload: ZoneEntity) => Promise<RequestResult<any> | null>,
    /**
     * 删除区域
     */
    deleteZone: (payload: ZoneEntity) => Promise<RequestResult<any> | null>,
    /**
     * 查询区域列表
     */
    queryZoneList: () => void,
    /**
     * 查询区域数据
     */
    queryZoneData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void
}

export type { ZoneState };
export { zone };