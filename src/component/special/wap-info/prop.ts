import { Wap } from "@/schema/wap";

export interface WapInfoProp {

}

/**
 * 页签枚举
 */
export enum SpiTab {
    /**
     * 全部
     */
    All = 'all',
    /**
     * 手机信号
     */
    Signal = 'signal',
    /**
     * 热点
     */
    Hotspot = 'hotspot',
    /**
     * 摄像头
     */
    Camera = 'camera',
    /**
     * 终端
     */
    Terminal = 'terminal',
    /**
     * 其他
     */
    Others = 'others'
}