import { FakeHotspot } from "@/schema/fake-hotspot";
import { fakeHotspot } from './fake-hotspot';

interface FakeHotspotState {
    /**
     * 伪热点页码
     */
    fakeHotspotPageIndex: number,
    /**
     * 伪热点页尺寸
     */
    fakeHotspotPageSize: number,
    /**
     * 伪热点总数
     */
    fakeHotspotTotal: number,
    /**
     * 伪热点读取中
     */
    fakeHotspotLoading: boolean,
    /**
     * 伪热点分页数据
     */
    fakeHotspotData: FakeHotspot[],
    /**
     * 查询伪热点分页数据
     */
    queryFakeHotspotData: (pageIndex: number, pageSize: number, condition: Record<string, any>) => void,
}

export type { FakeHotspotState };
export { fakeHotspot };