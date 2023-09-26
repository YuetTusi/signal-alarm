
export interface SettingMenuProp {
};

export interface UserMenuProp {

    onMenuItemClick: (action: UserMenuAction) => void
};

export enum UserMenuAction {
    /**
     * 声音开关
     */
    VoiceSwitch,
    /**
     * 修改密码
     */
    ModifyPassword,
    /**
     * 登出
     */
    Logout
}

export enum MenuPath {
    /**
     * 专项检查
     */
    SpiSearch = 'spiSearch',
    /**
     * 预警信息
     */
    WarnSearch = 'warnSearch',
    /**
     * 检查报告
     */
    CheckReport = 'checkReport',
    /**
     * 设备管理
     */
    Devops = 'devops',
    /**
     * 实时频谱
     */
    RealTimeSpectrum = 'realTimeSpectrum',
    /**
     * 历史频谱
     */
    HistorySpectrum = 'historySpectrum',
    /**
     * 背景频谱
     */
    BaseSpectrum = 'baseFreq',
    /**
     * 中间件
     */
    Middle = 'middle',
    /**
     * 用户管理
     */
    SysUser = 'sysUser',
    /**
     * 角色管理
     */
    SysRole = 'sysRole',
    /**
     * 菜单管理
     */
    SysMenu = 'sysMenu',
    /**
     * 操作日志
     */
    SysOperLog = 'sysOperLog',
    /**
     * 登录日志
     */
    SysLoginLog = 'sysLoginLog'
}