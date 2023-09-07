import { Dayjs } from "dayjs";
import { FormInstance } from "antd";

export interface OthersTableProp {
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
     * @param site 场所下的设备id（多个用逗号分割）
     */
    onSearch: (beginTime: Dayjs, endTime: Dayjs, site?: string) => void,
    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param site 场所下的设备id（多个用逗号分割）
     */
    onExport: (beginTime: Dayjs, endTime: Dayjs, site?: string) => void
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
     * 场所
     */
    site: string[]
    /**
     * 枚举
     */
    // type: string
}