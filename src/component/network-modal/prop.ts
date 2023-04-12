export interface NetworkModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 确定
     * @param ip IP地址
     */
    onOk: (ip: string, port: number) => void,
    /**
     * 取消
     */
    onCancel: () => void
}

export interface FormValue {
    /**
     * IP地址
     */
    ip: string,
    /**
     * 端口号
     */
    port: number
}