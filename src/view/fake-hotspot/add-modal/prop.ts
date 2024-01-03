import { FakeHotspot } from "@/schema/fake-hotspot"
import { FormInstance } from "antd/lib/form"

export interface AddModalProp {

    open: boolean,

    onOk: (data: FakeHotspot) => void,

    onClose: () => void
}

export interface AddFormProp {

    formRef: FormInstance<FakeHotspot>
}