import { reading } from './reading';

interface ReadingState {
    /**
     * 全局读取中状态
     */
    reading: boolean,
    /**
     * 更新全局读取中状态
     * @param payload 读取中
     */
    setReading: (payload: boolean) => void
}

export type { ReadingState };
export { reading };