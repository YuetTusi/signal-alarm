import { Protocol } from '@/schema/protocol';
import { SpecialBase } from "@/schema/special-base";
import { specialTop } from './special-top';
import { SpiTab } from '@/component/special/wap-info/prop';

interface SpecialTopState {

    /**
     * 专项检查详情框打开/关闭
     */
    specialDetailModalOpen: boolean,
    /**
     * Tab页签key
     */
    specialActiveKey: SpiTab,
    /**
     * 默认热点名称（从伪热点页跳转的默认查询条件）
     */
    specialDefaultHotspotName?: string,
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
     * 蓝牙Top10数据
     */
    specialBluetoothTopData: SpecialBase[],
    /**
     * 窃听器Top10数据
     */
    specialWiretapTopData: SpecialBase[],
    /**
     * 加载状态
     */
    specialTopLoading: boolean,
    /**
     * 专项检查详情框打开/关闭
     * @param open 打开/关闭
     */
    setSpecialDetailModalOpen: (open: boolean) => void,
    /**
     * 更新打开页签key
     */
    setSpecialActiveKey: (payload: SpiTab) => void,
    /**
     * 更新默认热点名称
     */
    setSpecialDefaultHotspotName: (payload: string | undefined) => void,
    /**
     * 清空所有Top10数据
     */
    clearAllTopData: () => void,
    /**
     * 返回全部Top10数据
     */
    getAllTopData: () => SpecialBase[],
    /**
     * 查询全部Top10数据
     */
    queryAllTopData: () => void,
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
    querySpecialTerminalTopData: (type: Protocol[]) => void,
    /**
     * 查询蓝牙Top10数据
     */
    querySpecialBluetoothTopData: () => void,
    /**
     * 查询窃听器Top10数据
     */
    querySpecialWiretapTopData: (type: Protocol[]) => void
}

export type { SpecialTopState };
export { specialTop };