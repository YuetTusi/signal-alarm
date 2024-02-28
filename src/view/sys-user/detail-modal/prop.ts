import { SystemUser } from "@/schema/system-user"

export interface DetailModalProp {

    /**
     * 打开/关闭
     */
    open: boolean,
    /**
     * 数据
     */
    data: SystemUser,
    /**
     * 取消
     * @returns 
     */
    onCancel: () => void
}