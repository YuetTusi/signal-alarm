import { Dayjs } from "dayjs";
import { AlarmMsg } from "@/schema/alarm-msg";
import { FormInstance } from "antd";
import { Key } from "antd/es/table/interface";

export interface AlarmTopProp { }

export interface DetailModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 取消handle
     */
    onCancel: () => void
}

export interface ProcessModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 数据
     */
    data?: AlarmMsg,
    /**
     * 确定handle
     */
    onOk: (data: AlarmMsg, remark?: string) => void,
    /**
     * 取消handle
     */
    onCancel: () => void
}

export interface AlarmDetailModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 数据
     */
    data?: AlarmMsg,
    /**
     * 取消handle
     */
    onCancel: () => void
}

export interface BatchModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 批量数据
     */
    data: AlarmMsg[],
    /**
     * 确定handle
     */
    onOk: (data: AlarmMsg[], remark?: string) => void,
    /**
     * 取消handle
     */
    onCancel: () => void
}

export interface SearchBarProp {

    /**
     * 表单实例 
     */
    formRef: FormInstance<SearchFormValue>,
    /**
     * 选中行
     */
    selectedKeys: Key[],
    /**
     * 批量处理
     */
    onBatch: (ids: number[], status: number, remark: string) => void,
    /**
     * 查询
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param status 状态
     */
    onSearch: (beginTime: Dayjs, endTime: Dayjs, status: number) => void,
    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param status 状态
     */
    onExport: (beginTime: Dayjs, endTime: Dayjs, status: number) => void
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
     * 状态
     */
    status: number
}

export enum ActionType {
    /**
     * 处理
     */
    Process,
    /**
     * 详情
     */
    Detail
}