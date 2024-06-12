import { Dayjs } from "dayjs";
import { FormInstance } from "antd";

export interface BluetoothTableProp {
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
     * @param bluetoothType 蓝牙类型
     * @param mac MAC地址
     */
    onSearch: (beginTime: Dayjs, endTime: Dayjs, bluetoothType: string, mac: string) => void,
    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param bluetoothType 蓝牙类型
     */
    onExport: (beginTime: Dayjs, endTime: Dayjs, bluetoothType: string, mac: string) => void
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
    bluetoothType: string,
    /**
     * MAC地址
     */
    mac: string
    /**
     * 枚举
     */
    // type: string
}

export enum ActionType {
    /**
     * 加至白名单
     */
    AddToWhiteList
}