import { Protocol } from "./protocol"

/**
 * 定位点
 */
class Point {
    /**
     * 内容
     */
    public content: string = ''
    /**
     * 纬度
     */
    public lat: string = ''
    /**
     * 经度
     */
    public lon: string = ''
    /**
     * 协议
     * WiFi:8,9 蓝牙:14 制式信号（对照setting/band.json）:101~113
     */
    public protocolType: number = -1
    /**
     * 类型 sta:终端,ap:热点
     */
    public type: string = ''
    /**
     * X轴
     */
    public x: number = 0
    /**
     * Y轴
     */
    public y: number = 0
    /**
     * 区域id
     */
    public areaId: number = 0
    /**
     * 接到推送时间（前端维护）
     */
    public actionTime: number = 0;
}

export { Point };