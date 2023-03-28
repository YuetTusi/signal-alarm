import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { SpecialTerminalState } from '.';
import { GetState, SetState } from '..';

const specialTerminal = (setState: SetState, _: GetState): SpecialTerminalState => ({

    /**
     * Top10数据
     */
    specialTerminalTop10Data: [],
    /**
     * 分页数据
     */
    specialTerminalData: [],
    /**
     * 总数
     */
    specialTerminalTotal: 0,
    /**
     * 当前页
     */
    specialTerminalPageIndex: 1,
    /**
     * 分页尺寸
     */
    specialTerminalPageSize: helper.PAGE_SIZE,
    /**
     * 加载中
     */
    specialTerminalLoading: false,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setSpecialTerminalLoading(payload: boolean) {
        setState({ specialTerminalLoading: payload });
    },
    /**
     * 更新分页数据
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setSpecialTerminalPage(pageIndex, pageSize, total) {
        setState({
            specialTerminalPageIndex: pageIndex,
            specialTerminalPageSize: pageSize,
            specialTerminalTotal: total
        });
    },
    /**
     * 查询专项检查（终端）Top10数据
     */
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
    /**
     * 查询专项检查（终端）分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
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
    /**
     * 导出专项检查（终端）数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
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