import { AppMode } from "@/schema/conf"

export interface NetworkModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 确定
     */
    onOk: (values: FormValue) => void,
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
    port: number,
    /**
     * 应用模式（单机版,网络版）
     */
    mode: AppMode
}