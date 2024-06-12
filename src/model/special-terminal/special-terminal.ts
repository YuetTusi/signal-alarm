import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { Terminal } from '@/schema/terminal';
import { Protocol } from '@/schema/protocol';
import { QueryPage } from '@/schema/query-page';
import { SpecialTerminalState } from '.';
import { GetState, SetState } from '..';

const specialTerminal = (setState: SetState, _: GetState): SpecialTerminalState => ({

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
                q.push(`createTimeBegin=${condition.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition.endTime}`);
            }
            if (condition?.type) {
                q.push(`protocolTypes=${encodeURIComponent(condition.type)}`);
            }
            if (condition?.mac) {
                q.push(`mac=${condition.mac}`);
            }
            if (condition?.deviceId) {
                q.push(`deviceId=${encodeURIComponent(condition.deviceId)}`);
            }
            params = '?' + q.join('&');
        } else {
            params = '?protocolTypes=' + helper.protocolToString([
                Protocol.WiFi24G,
                Protocol.WiFi58G,
                Protocol.Bluetooth50
            ])
        }
        try {
            const res = await request.get<QueryPage<Terminal>>(`/spi/terminal/${pageIndex}/${pageSize}${params}`);
            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<Terminal>>(`/spi/terminal/${res.data.pages}/${pageSize}${params}`);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        specialTerminalData: ret.data.records,
                        specialTerminalPageIndex: pageIndex,
                        specialTerminalPageSize: pageSize,
                        specialTerminalTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    specialTerminalData: res.data.records,
                    specialTerminalPageIndex: pageIndex,
                    specialTerminalPageSize: pageSize,
                    specialTerminalTotal: res.data.total
                });
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
        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${encodeURIComponent(condition?.beginTime)}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${encodeURIComponent(condition?.endTime)}`);
            }
            if (condition?.type) {
                q.push(`protocolTypes=${encodeURIComponent(condition?.type)}`);
            }
            if (condition?.mac) {
                q.push(`mac=${condition.mac}`);
            }
            if (condition?.deviceId) {
                q.push(`deviceId=${encodeURIComponent(condition.deviceId)}`);
            }
            params = `?page=${pageIndex}&limit=${pageSize}&` + q.join('&');
        } else {
            params = `?protocolTypes=${helper.protocolToString([
                Protocol.WiFi24G,
                Protocol.WiFi58G,
                Protocol.Bluetooth50
            ])}`
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