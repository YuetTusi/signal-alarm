export interface SpectrumProp {
    domId: string,//外层容器DOM id
    arfcn: number[], //横轴数据（频点）
    data: number[], //坐标数据 db值
    captureTime: number, //时刻
    serieName: string
};