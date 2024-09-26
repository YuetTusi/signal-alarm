import { Zone as ZoneEntity } from '@/schema/zone';
import { RequestResult } from '@/utility/http';
import { zone } from './zone';

interface ZoneState {
    /**
     * 全部区域数据（列表）
     */
    zoneList: ZoneEntity[],
    /**
     * 正在显示的区域（地图组件,Select选中的区域）
     */
    zoneDisplay?: ZoneEntity,
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
     * 设置正在展示的区域
     */
    setZoneDisplay: (payload: ZoneEntity) => void,
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
    queryZoneData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * id查询区域
     */
    queryZoneById: (id: string) => void,
    /**
     * 清空区域列表
     */
    clearZoneList: () => void
}

export type { ZoneState };
export { zone };