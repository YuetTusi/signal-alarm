export interface PointModalProp {

    /**
     * 打开/关闭
     */
    open: boolean,
    /**
     * X轴位置
     */
    x: number,
    /**
     * Y轴位置
     */
    y: number,
    /**
     * 背景图base64
     */
    background: string,
    /**
     * 取消
     */
    onCancel: () => void,
    /**
     * 确定
     * @param x X轴位置
     * @param y Y轴位置
     */
    onOk: (x: number, y: number) => void
}