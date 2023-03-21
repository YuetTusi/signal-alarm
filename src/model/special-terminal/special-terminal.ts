import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { SpecialTerminalState } from '.';
import { GetState, SetState } from '..';

const specialTerminal = (setState: SetState, _: GetState): SpecialTerminalState => ({

    specialTerminalTop10Data: [],
    specialTerminalData: [],
    specialTerminalTotal: 0,
    specialTerminalPageIndex: 1,
    specialTerminalPageSize: helper.PAGE_SIZE,
    specialTerminalLoading: false,

    setSpecialTerminalLoading(payload: boolean) {
        setState({ specialTerminalLoading: payload });
    },
    setSpecialTerminalPage(pageIndex, pageSize, total) {
        setState({
            specialTerminalPageIndex: pageIndex,
            specialTerminalPageSize: pageSize,
            specialTerminalTotal: total
        });
    },
    async querySpecialTerminalTop10Data() {
        message.destroy();
        setState({ specialTerminalLoading: true });
        try {
            const res = await request.get('/spi/terminal/new');
            if (res === null) {
                message.warning('查询失败')
            } else if (res.code === 200) {
                setState({ specialTerminalTop10Data: res.data });
            } else {
                message.warning(`查询失败（${res.message ?? ''}）`)
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialTerminalLoading: false });
        }
    },
    async querySpecialTerminalData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {

        message.destroy();
        setState({ specialTerminalLoading: true });
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
            const res = await request.get(`/spi/terminal/${pageIndex}/${pageSize}${params}`);
            if (res === null) {
                message.warning('查询失败')
            } else if (res.code === 200) {
                setState({
                    specialTerminalData: res.data.records,
                    specialTerminalPageIndex: pageIndex,
                    specialTerminalPageSize: pageSize,
                    specialTerminalTotal: res.data.total
                });
            } else {
                message.warning(`查询失败（${res.message ?? ''}）`)
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialTerminalLoading: false });
        }
    },
    async exportSpecialTerminalData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {
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
            const chunk = await request.attachment(`/spi/terminal/export${params}`);
            return chunk;
        } catch (error) {
            throw error;
        }
    }
});

export { specialTerminal };