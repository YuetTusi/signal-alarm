import { FC } from "react";
import { FakeHotspot } from "@/schema/fake-hotspot";

export interface CountModalProp {
    /**
     * 打开/关闭
     */
    open: boolean,
    /**
     * 数据
     */
    data?: FakeHotspot,
    /**
     * 取消handle
     */
    onCancel: () => void
}

export type CountModalComp = FC<CountModalProp>;