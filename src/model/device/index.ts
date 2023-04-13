import { ComDevice } from "@/schema/com-device";
import { device } from './device';

interface DeviceState {

    /**
     * 设备数据
     */
    deviceData: ComDevice[],
    /**
     * 页码
     */
    devicePageIndex: number,
    /**
     * 页尺寸
     */
    devicePageSize: number,
    /**
     * 总数
     */
    deviceTotal: number,
    /**
     * 读取状态
     */
    deviceLoading: boolean,
    /**
     * 设置设备分页数据
     */
    setDevicePage: (pageIndex: number, pageSize: number, total: number) => void,
    /**
     * 查询设备数据
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    queryDeviceData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void
}

export type { DeviceState };
export { device };