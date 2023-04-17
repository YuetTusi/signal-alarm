import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { Hotspot } from '@/schema/hotspot';
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
            const res = await request.get<Hotspot[]>('/spi/hotspot/new');
            if (res === null) {
                message.warning('查询失败')
            } else if (res.code === 200) {
                const sorted = !helper.isNullOrUndefined(res.data) && res.data.length > 0
                    ? res.data.sort((a, b) => Number(b.rssi) - Number(a.rssi))
                    : []; //按强度值降序
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
    async querySpecialHotspotData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {

        message.destroy();
        setState({ specialHotspotLoading: true });
        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${condition?.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition?.endTime}`);
            }
            params = '?' + q.join('&');
        }
        try {
            const res = await request.get(`/spi/hotspot/${pageIndex}/${pageSize}${params}`);
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
    async exportSpecialHotspotData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {
        let params = `?page=${pageIndex}&limit=${pageSize}`;
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${condition?.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition?.endTime}`);
            }
            params = params + '&' + q.join('&');
        }
        try {
            const chunk = await request.attachment(`/spi/hotspot/export${params}`);
            return chunk;
        } catch (error) {
            throw error;
        }
    }
});

export { specialHotspot };