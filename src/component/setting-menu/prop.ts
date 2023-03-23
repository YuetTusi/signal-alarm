export enum SettingMenuAction {

    /**
     * 灵敏度
     */
    Sensitivity,
    /**
     * 网络
     */
    Network,
    /**
     * 摄像头
     */
    Camera,
    /**
     * 改密码
     */
    ModifyPassword
}

export interface SettingMenuProp {


    onMenuAction: (type: SettingMenuAction) => void
};