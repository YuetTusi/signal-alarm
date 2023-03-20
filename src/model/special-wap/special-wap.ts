import fs from 'fs';
import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { SpecialWapState } from '.';
import { GetState, SetState } from '..';

const specialWap = (setState: SetState, _: GetState): SpecialWapState => ({

    specialWapTop10Data: [],
    specialWapData: [],
    specialWapTotal: 0,
    specialWapPageIndex: 1,
    specialWapPageSize: helper.PAGE_SIZE,
    specialWapLoading: false,

    setSpecialWapLoading(payload: boolean) {
        setState({ specialWapLoading: payload });
    },
    setSpecialWapPage(pageIndex, pageSize, total) {
        setState({
            specialWapPageIndex: pageIndex,
            specialWapPageSize: pageSize,
            specialWapTotal: total
        });
    },
    async querySpecialWapTop10Data() {
        message.destroy();
        setState({ specialWapLoading: true });
        try {
            const res = await request.get('/spi/wap/new');
            if (res === null) {
                message.warning('查询失败')
            } else if (res.code === 200) {
                setState({ specialWapTop10Data: res.data });
            } else {
                message.warning(`查询失败（${res.message ?? ''}）`)
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialWapLoading: false });
        }
    },
    async querySpecialWapData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {

        message.destroy();
        setState({ specialWapLoading: true });
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
            const res = await request.get(`/spi/wap/${pageIndex}/${pageSize}${params}`);
            if (res === null) {
                message.warning('查询失败')
            } else if (res.code === 200) {
                setState({
                    specialWapData: res.data.records,
                    specialWapPageIndex: pageIndex,
                    specialWapPageSize: pageSize,
                    specialWapTotal: res.data.total
                });
            } else {
                message.warning(`查询失败（${res.message ?? ''}）`)
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialWapLoading: false });
        }
    },
    async exportSpecialWapData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {
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
            console.log(`/spi/wap/export${params}`);
            const chunk = await request.attachment(`/spi/wap/export${params}`);
            return chunk;
        } catch (error) {
            throw error;
        }
    }
});

export { specialWap };