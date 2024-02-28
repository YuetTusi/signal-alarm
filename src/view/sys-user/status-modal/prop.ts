import { SystemUser } from "@/schema/system-user";

export interface FormValue {
    /**
     * 状态
     */
    status: number
}

export interface StatusProp {

    open: boolean,

    data?: SystemUser,

    onOk: (id: number, status: number) => void,

    onCancel: () => void
}