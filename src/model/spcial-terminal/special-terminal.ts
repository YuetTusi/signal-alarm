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
    async querySpecialTerminalData(pageIndex: number, pageSize = helper.PAGE_SIZE) {

        message.destroy();
        setState({ specialTerminalLoading: true });
        try {
            const res = await request.get(`/spi/terminal/${pageIndex}/${pageSize}`);
            if (res === null) {
                message.warning('查询失败')
            } else if (res.code === 200) {
                console.log(res);
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
});

export { specialTerminal };