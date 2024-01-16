export interface SpectrumProp {
    domId: string,//外层容器DOM id
    arfcn: number[], //横轴数据（频点）
    /**
     * 实时曲线数据
     */
    realData: number[],
    /**
     * 比对曲线数据 （比对功能用，实时功能此数据为空）
     */
    compareData: number[]
};