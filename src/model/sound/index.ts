import { sound } from './sound';

interface SoundState {
    /**
     * 声音
     */
    sound: boolean,
    /**
     * 设置声音
     */
    setSound: (payload: boolean) => void,
}

export type { SoundState };
export { sound };