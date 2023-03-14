export interface PasswordModalProp {

    open: boolean,
    onOk: (newPassword: string) => void,
    onCancel: () => void
}

export interface FormValue {
    /**
     * 原密码
     */
    originPassword: string,
    /**
     * 新密码
     */
    newPassword: string,
    /**
     * 确认密码
     */
    confirmPassword: string
}