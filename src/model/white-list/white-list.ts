import dayjs from 'dayjs';
import { QueryPage } from '@/schema/query-page';
import { WhiteList as WhiteListEntity } from '@/schema/white-list';
import { request } from '@/utility/http';
import { helper } from '@/utility/helper';
import { FormValue } from '@/view/white-list/add-modal/prop';
import { GetState, SetState } from '..';
import { WhiteListState } from '../white-list';

const whiteList = (setState: SetState, _: GetState): WhiteListState => ({
    /**
     * 白名单Top10数据
     */
    whiteListTop: [],
    /**
     * 白名单数据
     */
    whiteListData: [],
    /**
     * 页码
     */
    whiteListPageIndex: 1,
    /**
     * 页尺寸
     */
    whiteListPageSize: helper.PAGE_SIZE,
    /**
     * 总数
     */
    whiteListTotal: 0,
    /**
     * 读取中
     */
    whiteListLoading: false,
    /**
     * 添加白名单
     */
    async addWhiteList(payload: FormValue) {
        const url = '/white-list/add';
        try {
            const res = await request.post(url, payload);
            return res;
        } catch (error) {
            throw error;
        }
    },
    /**
     * 删除白名单
     */
    async deleteWhiteList(id: string) {
        const url = `/white-list/delete/${id}`;
        try {
            const res = await request.del(url);
            return res;
        } catch (error) {
            throw error;
        }
    },
    /**
     * 查询白名单Top10
     */
    async queryWhiteListTop() {
        const url = '/white-list';
        try {
            const res = await request.get<WhiteListEntity[]>(url);
            if (res !== null && res.code === 200) {
                setState({ whiteListTop: res.data });
            } else {
                setState({ whiteListTop: [] });
            }
        } catch (error) {
            throw error;
        }
    },
    /**
     * 查询白名单数据
     */
    async queryWhiteListData(pageIndex: number, pageSize: number, condition?: Record<string, any>) {
        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.type !== -1) {
                q.push(`type=${condition?.type}`);
            }
            if (condition?.status !== -1) {
                q.push(`status=${condition?.status}`);
            }
            params = '?' + q.join('&');
        }
        setState({ whiteListLoading: true });
        try {
            const res = await request.get<QueryPage<any>>(`/white-list/${pageIndex}/${pageSize}${params}`);
            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<any>>(`/white-list/${res.data.pages}/${pageSize}${params}`);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        whiteListData: ret.data.records.sort((a, b) =>
                            dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                        whiteListPageIndex: pageIndex,
                        whiteListPageSize: pageSize,
                        whiteListTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    whiteListData: res.data.records.sort((a, b) =>
                        dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                    whiteListPageIndex: pageIndex,
                    whiteListPageSize: pageSize,
                    whiteListTotal: res.data.total
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setState({ whiteListLoading: false });
        }
    }
});

export { whiteList };