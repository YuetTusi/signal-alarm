import { Protocol } from "@/schema/protocol"
import { SpiTab } from "../wap-info/prop"

export interface DetailModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 默认页签Key
     */
    defaultTabKey: SpiTab,
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
// export enum DetailTab {
//     /**
//      * 手机信号
//      */
//     Wap = 'detail_wap',
//     /**
//      * 热点
//      */
//     Hotspot = 'detail_hotspot',
//     /**
//      * 摄像头
//      */
//     Camera = 'detail_camera',
//     /**
//      * 窃听器
//      */
//     Wiretap = 'detail_wiretap',
//     /**
//      * 终端
//      */
//     Terminal = 'detail_terminal',
//     /**
//      * 其他
//      */
//     Others = 'others'
// }