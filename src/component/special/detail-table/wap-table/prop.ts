import { FormInstance } from "antd";
import { Dayjs } from "dayjs";

export interface WapTableProp { }

export interface SearchBarProp {
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
     * @param site 场所下的设备id（多个用逗号分割）
     */
    onExport: (beginTime: Dayjs, endTime: Dayjs, type: string, site?: string) => void
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
