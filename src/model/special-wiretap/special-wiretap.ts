import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { Wap } from '@/schema/wap';
import { Protocol } from '@/schema/protocol';
import { SpecialWiretapState } from '.';
import { GetState, SetState } from '..';

const specialWiretap = (setState: SetState, _: GetState): SpecialWiretapState => ({

    specialWiretapData: [],
    specialWiretapTotal: 0,
    specialWiretapPageIndex: 1,
    specialWiretapPageSize: helper.PAGE_SIZE,
    specialWiretapLoading: false,

    setSpecialWiretapLoading(payload: boolean) {
        setState({ specialWiretapLoading: payload });
    },
    setSpecialWiretapPage(pageIndex, pageSize, total) {
        setState({
            specialWiretapPageIndex: pageIndex,
            specialWiretapPageSize: pageSize,
            specialWiretapTotal: total
        });
    },
    async querySpecialWiretapData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {

        message.destroy();
        setState({ specialWiretapLoading: true });
        let params = '';
        let q: string[] = [];
        if (condition?.beginTime) {
            q.push(`createTimeBegin=${condition.beginTime}`);
        }
        if (condition?.endTime) {
            q.push(`createTimeEnd=${condition.endTime}`);
        }
        q.push(`protocolTypes=${Protocol.Detectaphone}`);
        params = `?` + q.join('&');
        try {
            const res = await request.get<{
                records: Wap[],
                total: number
            }>(`/spi/wap/${pageIndex}/${pageSize}${params}`);
            if (res === null) {
                message.warning('查询失败')
            } else if (res.code === 200) {
                setState({
                    specialWiretapData: res.data.records.sort((a, b) => Number(b.rssi) - Number(a.rssi)),
                    specialWiretapPageIndex: pageIndex,
                    specialWiretapPageSize: pageSize,
                    specialWiretapTotal: res.data.total
                });
            } else {
                message.warning(`查询失败（${res.message ?? ''}）`)
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialWiretapLoading: false });
        }
    },
    async exportSpecialWiretapData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {
        let params = `?page=${pageIndex}&limit=${pageSize}`;
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${condition?.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition?.endTime}`);
            }
            q.push(`protocolTypes=${Protocol.Detectaphone}`);
            params = params + '&' + q.join('&');
        }
        try {
            const chunk = await request.attachment(`/spi/wap/export${params}`);
            return chunk;
        } catch (error) {
            throw error;
        }
    }
});

export { specialWiretap };