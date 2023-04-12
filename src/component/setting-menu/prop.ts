export enum SettingMenuAction {

    /**
     * 设备管理
     */
    Device,
    /**
     * 网络
     */
    Network,
    /**
     * 改密码
     */
    ModifyPassword
}

export interface SettingMenuProp {


    onMenuAction: (type: SettingMenuAction) => void
};