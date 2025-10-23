import { appSetting } from './app-setting';

interface AppSettingState {
    /**
     * 是否全屏显示地图
     */
    mapFullscreen: boolean,
    /**
     * 更新是否全屏显示地图
     */
    setMapFullscreen: (payload: boolean) => void
}

export type { AppSettingState };
export { appSetting };