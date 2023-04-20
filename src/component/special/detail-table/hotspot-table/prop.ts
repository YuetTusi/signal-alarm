import { FormInstance } from "antd";
import { Dayjs } from "dayjs";

export interface HotspotTableProp {
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
     */
    onSearch: (beginTime: Dayjs, endTime: Dayjs) => void,
    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     */
    onExport: (beginTime: Dayjs, endTime: Dayjs) => void
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
     * 类型
     */
    type: string
}