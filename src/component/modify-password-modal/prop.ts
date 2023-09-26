export interface ModifyPasswordModalProp {
    /**
     * 打开/关闭
     */
    open: boolean,
    /**
     * 取消Click
     */
    onCancel: () => void,
    /**
     * 确定Click
     */
    onOk: (oldPassword: string, newPassword: string) => void
};

export interface FormValue {
    /**
     * 原密码
     */
    oldPassword: string,
    /**
     * 新密码
     */
    newPassword: string,
    /**
     * 确认密码
     */
    confirmPassword: string
}