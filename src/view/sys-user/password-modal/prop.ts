import { SystemUser } from "@/schema/system-user";

export interface FormValue {
    /**
     * 密码
     */
    password: string,
    /**
     * 新密码
     */
    newPassword: string,
    /**
     * 确认密码
     */
    rePassword: string
}

export interface PasswordModalProp {

    open: boolean,

    data?: SystemUser,

    onOk: (id: number, newPassword: string, oldPassword: string) => void,

    onCancel: () => void
}