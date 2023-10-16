import { Wap } from "@/schema/wap";
import { specialBluetooth } from './special-bluetooth';

/**
 * 专项数据（蓝牙）
 */
interface SpecialBluetoothState {

    /**
     * 分页数据
     */
    specialBluetoothData: any[],
    /**
     * 当前页
     */
    specialBluetoothPageIndex: number,
    /**
     * 分页尺寸
     */
    specialBluetoothPageSize: number,
    /**
     * 总数
     */
    specialBluetoothTotal: number,
    /**
     * 加载中
     */
    specialBluetoothLoading: boolean,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setSpecialBluetoothLoading: (payload: boolean) => void,
    /**
     * 更新分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setSpecialBluetoothPage: (pageIndex: number, pageSize: number, total: number) => void,
    /**
     * 查询专项检查（蓝牙）分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    querySpecialBluetoothData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 导出
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    exportSpecialBluetoothData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => Promise<Buffer>
}

export type { SpecialBluetoothState };
export { specialBluetooth };