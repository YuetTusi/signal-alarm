import { Dayjs } from "dayjs"

/**
 * 实时频谱
 */
export interface RealSpectrumProp { };

/**
 * 历史频谱
 */
export interface HistorySpectrumProp { };

/**
 * 历史频谱
 */
export interface PastProp { };

/**
 * 查询表单
 */
export interface SearchForm {
    device: string
}

/**
 * 查询表单
 */
export interface HistorySearchForm {
    device: string,
    beginTime: Dayjs,
    endTime: Dayjs,
    speed: number
}

/**
 * 查询表单
 */
export interface BaseSearchForm {
    name: string,
    device: string,
    beginTime: Dayjs,
    endTime: Dayjs
}

/**
 * 操作类型
 */
export enum SpecOperate {
    /**
     * 未操作
     */
    Nothing,
    /**
     * 查询
     */
    Search,
    /**
     * 比对
     */
    Compare
}

export enum PastOperate {
    /**
     * 未操作
     */
    Nothing,
    /**
     * 播放
     */
    Play,
    /**
     * 比对
     */
    Compare
}