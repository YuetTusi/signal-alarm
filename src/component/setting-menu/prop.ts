
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
     * 登出
     */
    Logout
}