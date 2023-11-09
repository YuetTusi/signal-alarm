export interface MapProp {

    /**
     * X轴初值
     */
    x: number,
    /**
     * Y轴初值
     */
    y: number,
    /**
     * 背景图base64
     */
    background: string,
    /**
     * 打点handle
     * @param x X值
     * @param y Y值
     */
    onAddPoint: (x: number, y: number) => void
}

export interface SearchFormValue {
    /**
     * 区域
     */
    zone: number
}