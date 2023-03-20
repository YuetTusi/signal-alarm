import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { message } from 'antd';
import { SpecialHotspotState } from '.';
import { GetState, SetState } from '..';

const specialHotspot = (setState: SetState, _: GetState): SpecialHotspotState => ({

    specialHotspotTop10Data: [],
    specialHotspotData: [],
    specialHotspotTotal: 0,
    specialHotspotPageIndex: 1,
    specialHotspotPageSize: helper.PAGE_SIZE,
    specialHotspotLoading: false,

    setSpecialHotspotLoading(payload: boolean) {
        setState({ specialWapLoading: payload });
    },
    setSpecialHotspotPage(pageIndex, pageSize, total) {
        setState({
            specialHotspotPageIndex: pageIndex,
            specialHotspotPageSize: pageSize,
            specialHotspotTotal: total
        });
    },
    async querySpecialHotspotTop10Data() {
        message.destroy();
        setState({ specialHotspotLoading: true });
        try {
            const res = await request.get('/spi/hotspot/new');
            if (res === null) {
                message.warning('查询失败')
            } else if (res.code === 200) {
                setState({ specialHotspotTop10Data: res.data });
            } else {
                message.warning(`查询失败（${res.message ?? ''}）`)
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialHotspotLoading: false });
        }
    },
    async querySpecialHotspotData(pageIndex: number, pageSize = helper.PAGE_SIZE) {

        message.destroy();
        setState({ specialHotspotLoading: true });
        try {
            const res = await request.get(`/spi/hotspot/${pageIndex}/${pageSize}`);
            if (res === null) {
                message.warning('查询失败')
            } else if (res.code === 200) {
                setState({
                    specialHotspotData: res.data.records,
                    specialHotspotPageIndex: pageIndex,
                    specialHotspotPageSize: pageSize,
                    specialHotspotTotal: res.data.total
                });
            } else {
                message.warning(`查询失败（${res.message ?? ''}）`)
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialHotspotLoading: false });
        }
    },
});

export { specialHotspot };