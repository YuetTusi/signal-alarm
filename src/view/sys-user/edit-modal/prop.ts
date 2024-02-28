import { SystemUser } from "@/schema/system-user";

export interface EditModalProp {

    open: boolean,

    data?: SystemUser,

    onOk: (data: SystemUser) => void,

    onCancel: () => void
}