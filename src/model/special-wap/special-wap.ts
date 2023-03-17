import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { message } from 'antd';
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
    async querySpecialWapData(pageIndex: number, pageSize = helper.PAGE_SIZE) {

        message.destroy();
        setState({ specialWapLoading: true });
        try {
            const res = await request.get(`/spi/wap/${pageIndex}/${pageSize}`);
            if (res === null) {
                message.warning('查询失败')
            } else if (res.code === 200) {
                console.log(res);
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
});

export { specialWap };