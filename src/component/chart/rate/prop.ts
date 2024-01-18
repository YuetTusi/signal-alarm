export interface RateProp {
    /**
     * 实时数据
     */
    realData: number[],
    /**
     * 比对数据
     */
    compareData: number[],
    /**
     * 外层容器DOM
     */
    outerDomId: string
}