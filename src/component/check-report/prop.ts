import { FormInstance } from "antd"
import { Dayjs } from "dayjs"

export interface CheckReportProp { }

export interface ReportDetailModalProp {
    /**
     * 打开
     */
    open: boolean,
    /**
     * 取消 
     */
    onCancel: () => void
}

export interface SearchFormValue {
    beginTime: Dayjs,
    endTime: Dayjs
}

export interface SearchBarProp {

    /**
     * 表单引用
     */
    formRef: FormInstance<SearchFormValue>,
    /**
     * 查询
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param type 枚举
     */
    onSearch: (beginTime: Dayjs, endTime: Dayjs) => void,
    /**
     * 生成
     * @param beginTime 起始时间
     * @param endTime 结束时间
     */
    onGenerate: (beginTime: Dayjs, endTime: Dayjs) => void
}
