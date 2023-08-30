import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { Wap } from '@/schema/wap';
import { Protocol } from '@/schema/protocol';
import { SpecialOthersState } from '.';
import { GetState, SetState } from '..';

const specialOthers = (setState: SetState, _: GetState): SpecialOthersState => ({

    specialOthersData: [],
    specialOthersTotal: 0,
    specialOthersPageIndex: 1,
    specialOthersPageSize: helper.PAGE_SIZE,
    specialOthersLoading: false,

    setSpecialOthersLoading(payload: boolean) {
        setState({ specialOthersLoading: payload });
    },
    setSpecialOthersPage(pageIndex, pageSize, total) {
        setState({
            specialOthersPageIndex: pageIndex,
            specialOthersPageSize: pageSize,
            specialOthersTotal: total
        });
    },
    async querySpecialOthersData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {

        message.destroy();
        setState({ specialOthersLoading: true });
        let params = '';
        let q: string[] = [];
        if (condition?.beginTime) {
            q.push(`createTimeBegin=${condition.beginTime}`);
        }
        if (condition?.endTime) {
            q.push(`createTimeEnd=${condition.endTime}`);
        }
        q.push(`protocolTypes=${Protocol.Others}`);
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
                    specialOthersData: res.data.records,
                    specialOthersPageIndex: pageIndex,
                    specialOthersPageSize: pageSize,
                    specialOthersTotal: res.data.total
                });
            } else {
                message.warning(`查询失败（${res.message ?? ''}）`)
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialOthersLoading: false });
        }
    },
    async exportSpecialOthersData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {
        let params = `?page=${pageIndex}&limit=${pageSize}`;
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${condition?.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition?.endTime}`);
            }
            q.push(`protocolTypes=${Protocol.Others}`);
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

export { specialOthers };