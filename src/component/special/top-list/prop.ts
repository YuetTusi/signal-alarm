import { SpecialBase } from "@/schema/special-base";
import { SpiTab } from "../wap-info/prop";

export interface TopListProp {

    /**
     * Top10数据
     */
    data: SpecialBase[],
    /**
     * 类型
     */
    type: SpiTab
};

export interface TotalListProp {

    /**
     * Top10数据
     */
    data: SpecialBase[],
    /**
     * 类型
     */
    type: SpiTab
};