export interface NetworkModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 确定
     */
    onOk: (appName: string, ip: string, port: number) => void,
    /**
     * 取消
     */
    onCancel: () => void
}

export interface FormValue {

    /**
     * 应用名称
     */
    appName: string,
    /**
     * IP地址
     */
    ip: string,
    /**
     * 端口号
     */
    port: number
}