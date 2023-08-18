import { Terminal } from "@/schema/terminal";
import { specialCamera } from './special-camera';

/**
 * 专项数据（摄像头）
 */
interface SpecialCameraState {

    /**
     * 分页数据
     */
    specialCameraData: Terminal[],
    /**
     * 当前页
     */
    specialCameraPageIndex: number,
    /**
     * 分页尺寸
     */
    specialCameraPageSize: number,
    /**
     * 总数
     */
    specialCameraTotal: number,
    /**
     * 加载中
     */
    specialCameraLoading: boolean,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setSpecialCameraLoading: (payload: boolean) => void,
    /**
     * 更新分页数据
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setSpecialCameraPage: (pageIndex: number, pageSize: number, total: number) => void,
    /**
     * 查询专项检查（摄像头）分页数据
     */
    querySpecialCameraData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void,
    /**
     * 导出专项检查（摄像头）数据
     */
    exportSpecialCameraData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => Promise<Buffer>
}

export type { SpecialCameraState };
export { specialCamera };