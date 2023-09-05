import { ComDevice } from "@/schema/com-device";
import { device } from './device';
import { RequestResult } from "@/utility/http";

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
    queryDeviceData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 添加设备
     * @param payload 数据
     * @returns 
     */
    addDevice: (payload: ComDevice) => Promise<RequestResult<any> | null>,
    /**
     * 删除设备
     */
    deleteDevice: (id: string) => Promise<RequestResult<any> | null>,
    /**
     * 编辑设备
     * @param payload 设备
     */
    updateDevice: (payload: ComDevice) => Promise<RequestResult<any> | null>,
    /**
     * 下发配置
     * @param data 设备数据
     * @param uploadLevel 配置内容
     */
    setDevice: (data: ComDevice, uploadLevel: string) => Promise<RequestResult<any> | null>
}

export type { DeviceState };
export { device };