import { FormInstance } from "antd";
import { Dayjs } from "dayjs";

export interface TerminalTableProp {
    /**
     * 父窗口打开
     */
    parentOpen?: boolean
}

export interface SearchBarProp {

    /**
    * 父窗口打开
    */
    parentOpen?: boolean,
    /**
     * 表单引用
     */
    formRef: FormInstance<SearchFormValue>,
    /**
     * 查询
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param type 枚举
     * @param mac 地址
     * @param site 场所下的设备id（多个用逗号分割）
     */
    onSearch: (beginTime: Dayjs, endTime: Dayjs, type: string, mac: string, site?: string) => void,
    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param type 枚举
     * @param mac 地址
     * @param site 场所下的设备id（多个用逗号分割）
     */
    onExport: (beginTime: Dayjs, endTime: Dayjs, type: string, mac: string, site?: string) => void
}

export interface SearchFormValue {
    /**
     * 起始时间
     */
    beginTime: Dayjs,
    /**
     * 结束时间
     */
    endTime: Dayjs,
    /**
     * 枚举
     */
    type: string,
    /**
     * MAC地址
     */
    mac: string,
    /**
     * 场所设备
     */
    site: string[],
    /**
     * 连接状态
     */
    connect: number
}

export enum ActionType {
    /**
     * 加至白名单
     */
    AddToWhiteList
}