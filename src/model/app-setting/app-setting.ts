import { AppSettingState } from ".";
import { GetState, SetState } from "..";

const appSetting = (setState: SetState, _: GetState): AppSettingState => ({

    /**
     * 读取中状态
     */
    mapFullscreen: false,
    /**
     * 设置读取中状态
     * @param payload 读取中
     */
    setMapFullscreen: (payload: boolean) => {
        setState({ mapFullscreen: payload });
    }
});

export { appSetting };