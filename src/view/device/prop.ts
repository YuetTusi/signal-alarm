

export interface DeviceProp { };

export interface FormValue {
    /**
     * 设备名称 
     */
    deviceName: string,
    /**
     * 设备状态
     */
    status: number
}

export enum ActionType {
    /**
     * 编辑
     */
    Edit,
    /**
     * 删除
     */
    Delete,
    /**
     * 配置下发
     */
    Set
}