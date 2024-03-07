import { FreqCompare } from "@/schema/freq-compare";

export interface RateProp {
    /**
     * 实时数据
     */
    realData: number[],
    /**
     * 比对数据
     */
    compareData: { currentOffsetSignal: number | undefined; itemStyle: any; }[],
    /**
     * 表格数据
     */
    displayData: FreqCompare[],
    /**
     * 外层容器DOM
     */
    outerDomId: string
}