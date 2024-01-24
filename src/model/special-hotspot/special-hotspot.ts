import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { Protocol } from '@/schema/protocol';
import { Hotspot } from '@/schema/hotspot';
import { QueryPage } from '@/schema/query-page';
import { SpecialHotspotState } from '.';
import { GetState, SetState } from '..';

const specialHotspot = (setState: SetState, _: GetState): SpecialHotspotState => ({

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
    async querySpecialHotspotData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {

        message.destroy();
        setState({ specialHotspotLoading: true });
        let params = '';
        if (helper.isNullOrUndefined(condition)) {
            params = `?protocolTypes=${encodeURIComponent(helper.protocolToString([
                Protocol.WiFi24G,
                Protocol.WiFi58G
            ]))}`;
        } else {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${condition.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition.endTime}`);
            }
            if (condition?.hotspotName) {
                q.push(`hotspotName=${encodeURIComponent(condition.hotspotName)}`);
            }
            if (condition?.protocolTypes) {
                q.push(`protocolTypes=${encodeURIComponent(condition.protocolTypes)}`);
            }
            if (condition?.deviceId) {
                q.push(`deviceId=${encodeURIComponent(condition.deviceId)}`);
            }
            params = '?' + q.join('&');
        }
        try {
            const res = await request.get<QueryPage<Hotspot>>(`/spi/hotspot/${pageIndex}/${pageSize}${params}`);
            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<Hotspot>>(`/spi/hotspot/${res.data.pages}/${pageSize}${params}`);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        specialHotspotData: ret.data.records,
                        specialHotspotPageIndex: pageIndex,
                        specialHotspotPageSize: pageSize,
                        specialHotspotTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    specialHotspotData: res.data.records,
                    specialHotspotPageIndex: pageIndex,
                    specialHotspotPageSize: pageSize,
                    specialHotspotTotal: res.data.total
                });
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
            if (condition?.hotspotName) {
                q.push(`hotspotName=${encodeURIComponent(condition?.hotspotName)}`);
            }
            if (condition?.protocolTypes) {
                q.push(`protocolTypes=${encodeURIComponent(condition?.protocolTypes)}`);
            } else {
                q.push(`protocolTypes=${encodeURIComponent(helper.protocolToString([
                    Protocol.WiFi58G,
                    Protocol.WiFi24G
                ]))}`);
            }
            if (condition?.deviceId) {
                q.push(`deviceId=${encodeURIComponent(condition.deviceId)}`);
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