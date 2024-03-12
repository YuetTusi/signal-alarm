import { sound } from './sound';

/**
 * 报警音
 */
interface SoundState {
    /**
     * 声音
     */
    sound: boolean,
    /**
     * 开闭声音
     * @param payload 开启/关闭
     */
    setSound: (payload: boolean) => void,
}

export type { SoundState };
export { sound };