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