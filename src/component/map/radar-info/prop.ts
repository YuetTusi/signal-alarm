
export interface RadarInfoProp {

    open: boolean,
    /**
     * 设备id
     */
    deviceId?: string,
    /**
     * 关闭handle
     */
    onClose?: () => void
}