import { WhiteListType } from "@/schema/white-list";

export interface AddModalProp {

    /**
     * 打开
     */
    open: boolean,
    /**
     * 确定handle
     * @returns 
     */
    onOk: (data: FormValue) => void,
    /**
     * 取消handle
     * @returns 
     */
    onCancel: () => void
};

export interface FormValue {

    /**
     * 类型
     */
    type: WhiteListType,
    /**
     * 状态
     */
    status: number,
    /**
     * MAC地址
     */
    mac: string,
    /**
     * 起始频段
     */
    startFreq: string,
    /**
     * 结束频段
     */
    endFreq: string
} 