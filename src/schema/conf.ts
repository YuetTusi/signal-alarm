/**
 * 应用模式
 */
export enum AppMode {
    /**
     * 单机版
     */
    PC,
    /**
     * 全屏版
     */
    FullScreen
}

/**
 * 报警类型
 */
export enum AlarmType {
    /**
     * 单设备
     */
    Single,
    /**
     * 多设备
     */
    Multi
}

/**
 * App配置
 */
export interface Conf {
    /**
     * 应用模式
     */
    mode: AppMode,
    /**
     * 报警类型
     */
    alarmType: AlarmType
}