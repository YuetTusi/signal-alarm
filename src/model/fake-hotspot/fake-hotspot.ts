import dayjs from "dayjs";
import { helper } from "@/utility/helper";
import { request } from "@/utility/http";
import { QueryPage } from "@/schema/query-page";
import { FakeHotspot } from "@/schema/fake-hotspot";
import { FakeHotspotState } from ".";
import { GetState, SetState } from "..";

const fakeHotspot = (setState: SetState, _: GetState): FakeHotspotState => ({
    /**
     * 伪热点页码
     */
    fakeHotspotPageIndex: 1,
    /**
     * 伪热点页尺寸
     */
    fakeHotspotPageSize: helper.PAGE_SIZE,
    /**
     * 伪热点总数
     */
    fakeHotspotTotal: 0,
    /**
     * 伪热点读取中
     */
    fakeHotspotLoading: false,
    /**
     * 伪热点分页数据
     */
    fakeHotspotData: [],
    /**
     * 伪热点状态列表
     */
    fakeHotspotList: [],
    /**
     * 添加伪热点
     * @param payload
     */
    async addFakeHotspot(payload: FakeHotspot) {

        const url = '/fake-hotspot-protect/add';
        try {
            const res = await request.post(url, payload);
            return res;
        } catch (error) {
            throw error;
        }
    },
    /**
     * 查询伪热点状态列表
     * @param payload
     */
    async queryFakeHotspotList() {
        const url = '/fake-hotspot-protect';
        try {
            const res = await request.get<FakeHotspot[]>(url);
            if (res !== null && res.code === 200) {
                setState({ fakeHotspotList: res.data });
            } else {
                setState({ fakeHotspotList: [] });
            }
        } catch (error) {
            throw error;
        }
    },
    /**
     * 查询伪热点分页数据
     */
    async queryFakeHotspotData(pageIndex: number, pageSize: number, condition: Record<string, any>) {
        const url = `/fake-hotspot-protect/${pageIndex}/${pageSize}`;

        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (!helper.isNullOrUndefined(condition?.hotspotName) && condition.hotspotName !== '') {
                q.push(`hotspotName=${condition.hotspotName}`);
            }
            if (!helper.isNullOrUndefined(condition?.fakeMac) && condition.fakeMac !== '') {
                q.push(`fakeMac=${condition.fakeMac}`);
            }
            if (!helper.isNullOrUndefined(condition?.realMac) && condition.realMac !== '') {
                q.push(`realMac=${condition.realMac}`);
            }
            if (condition?.status !== -1) {
                q.push(`status=${condition.status}`);
            }
            params = '?' + q.join('&');
        }
        setState({ fakeHotspotLoading: true });
        try {
            const res = await request.get<QueryPage<FakeHotspot>>(url + params);
            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<FakeHotspot>>(`/fake-hotspot-protect/${res.data.pages}/${pageSize}${params}`);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        fakeHotspotData: ret.data.records.sort((a, b) =>
                            dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                        fakeHotspotPageIndex: pageIndex,
                        fakeHotspotPageSize: pageSize,
                        fakeHotspotTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    fakeHotspotData: res.data.records.sort((a, b) =>
                        dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                    fakeHotspotPageIndex: pageIndex,
                    fakeHotspotPageSize: pageSize,
                    fakeHotspotTotal: res.data.total
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ fakeHotspotLoading: false });
        }
    }
});

export { fakeHotspot };