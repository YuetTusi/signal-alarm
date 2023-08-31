import { message } from 'antd';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { Terminal } from '@/schema/terminal';
import { Protocol } from '@/schema/protocol';
import { QueryPage } from '@/schema/query-page';
import { SpecialCameraState } from '.';
import { GetState, SetState } from '..';

const specialCamera = (setState: SetState, _: GetState): SpecialCameraState => ({

    /**
     * 分页数据
     */
    specialCameraData: [],
    /**
     * 总数
     */
    specialCameraTotal: 0,
    /**
     * 当前页
     */
    specialCameraPageIndex: 1,
    /**
     * 分页尺寸
     */
    specialCameraPageSize: helper.PAGE_SIZE,
    /**
     * 加载中
     */
    specialCameraLoading: false,
    /**
     * 更新加载中状态
     * @param payload 
     */
    setSpecialCameraLoading(payload: boolean) {
        setState({ specialCameraLoading: payload });
    },
    /**
     * 更新分页数据
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     * @param total 总数
     */
    setSpecialCameraPage(pageIndex, pageSize, total) {
        setState({
            specialCameraPageIndex: pageIndex,
            specialCameraPageSize: pageSize,
            specialCameraTotal: total
        });
    },
    /**
     * 查询专项检查（摄像头）分页数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    async querySpecialCameraData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {

        message.destroy();
        setState({ specialCameraLoading: true });
        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${condition?.beginTime}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${condition?.endTime}`);
            }
            q.push(`protocolTypes=${Protocol.Camera}`);
            params = '?' + q.join('&');
        } else {
            params = '?protocolTypes=' + Protocol.Camera
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
                        specialCameraData: ret.data.records,
                        specialCameraPageIndex: pageIndex,
                        specialCameraPageSize: pageSize,
                        specialCameraTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    specialCameraData: res.data.records,
                    specialCameraPageIndex: pageIndex,
                    specialCameraPageSize: pageSize,
                    specialCameraTotal: res.data.total
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ specialCameraLoading: false });
        }
    },
    /**
     * 导出专项检查（摄像头）数据
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     * @param condition 条件
     */
    async exportSpecialCameraData(pageIndex: number, pageSize = helper.PAGE_SIZE, condition?: Record<string, any>) {
        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.beginTime) {
                q.push(`createTimeBegin=${encodeURIComponent(condition?.beginTime)}`);
            }
            if (condition?.endTime) {
                q.push(`createTimeEnd=${encodeURIComponent(condition?.endTime)}`);
            }
            q.push(`protocolTypes=${Protocol.Camera}`);
            params = `?page=${pageIndex}&limit=${pageSize}&` + q.join('&');
        } else {
            params = `?protocolTypes=${Protocol.Camera}`
        }
        try {
            console.log(`/spi/terminal/export${params}`);
            const chunk = await request.attachment(`/spi/terminal/export${params}`);
            return chunk;
        } catch (error) {
            throw error;
        }
    }
});

export { specialCamera };