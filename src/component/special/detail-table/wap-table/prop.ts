import { FormInstance } from "antd";
import { Dayjs } from "dayjs";

export interface WapTableProp {
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
     * @param type 类型
     * @param site 场所下的设备id（多个用逗号分割）
     */
    onSearch: (beginTime: Dayjs, endTime: Dayjs, type: string, site?: string) => void,
    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param type 类型
     */
    onExport: (beginTime: Dayjs, endTime: Dayjs, type: string) => void
}

export interface DevInSite {
    /**
     * 节点层级类型all（全部）,site（设备地址）,device（设备）
     */
    type: string,
    /**
     * 设备id
     */
    deviceId: string[]
}

export interface SearchFormValue {
    /**
     * 起始时间
     */
    beginTime: Dayjs,
    /**
     * 结束时间
     */
    endTime: Dayjs
    /**
     * 类型
     */
    type: string,
    /**
     * 场所
     */
    site: string[]
}
