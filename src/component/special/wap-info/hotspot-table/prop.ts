import { Dayjs } from "dayjs";
import { Protocol } from "@/schema/protocol";

export interface HotspotTableProp {
}

export interface HotspotTopProp {
    protocol: Protocol
}

export interface SearchBarProp {

    /**
     * 查询
     * @param beginTime 起始时间
     * @param endTime 结束时间
     */
    onSearch: (beginTime: Dayjs, endTime: Dayjs) => void,
    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     */
    onExport: (beginTime: Dayjs, endTime: Dayjs) => void
}

export interface SearchFormValue {
    /**
     * 起始时间
     */
    beginTime: Dayjs,
    /**
     * 结束时间
     */
    endTime: Dayjs
}