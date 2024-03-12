import { GetState, SetState } from '..';
import { SoundState } from '../sound';

const sound = (setState: SetState, _: GetState): SoundState => ({
    /**
     * 声音
     */
    sound: false,
    /**
     * 开闭声音
     * @param payload 开启/关闭
     */
    setSound(payload: boolean) {
        setState({ sound: payload });
    }
});

export { sound };