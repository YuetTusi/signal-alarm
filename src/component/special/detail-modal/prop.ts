import { Protocol } from "@/schema/protocol"

export interface DetailModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 分类
     */
    protocol: Protocol,
    /**
     * 确定
     */
    onOk: () => void,
    /**
     * 取消
     */
    onCancel: () => void
}

/**
 * 详情页签枚举
 */
export enum DetailTab {
    /**
     * 手机信号
     */
    Wap = 'detail_wap',
    /**
     * 热点
     */
    Hotspot = 'detail_hotspot',
    /**
     * 摄像头
     */
    Camera = 'detail_camera',
    /**
     * 窃听器
     */
    Wiretap = 'detail_wiretap',
    /**
     * 终端
     */
    Terminal = 'detail_terminal',
    /**
     * 其他
     */
    Others = 'others'
}