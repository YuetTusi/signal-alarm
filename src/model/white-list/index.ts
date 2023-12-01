import { WhiteList as WhiteListEntity } from '@/schema/white-list';
import { whiteList } from './white-list';
import { RequestResult } from '@/utility/http';
import { FormValue } from '@/view/white-list/add-modal/prop';

interface WhiteListState {
    /**
     * 白名单数据
     */
    whiteListData: WhiteListEntity[],
    /**
     * 页码
     */
    whiteListPageIndex: number,
    /**
     * 页尺寸
     */
    whiteListPageSize: number,
    /**
     * 总数
     */
    whiteListTotal: number,
    /**
     * 读取中
     */
    whiteListLoading: boolean,
    /**
     * 添加白名单
     */
    addWhiteList: (payload: FormValue) => Promise<RequestResult<any> | null>,
    /**
     * 删除白名单
     */
    deleteWhiteList: (id: string) => Promise<RequestResult<any> | null>,
    /**
     * 查询白名单数据
     */
    queryWhiteListData: (pageIndex: number, pageSize: number, condition?: Record<string, any>) => void
}

export type { WhiteListState };
export { whiteList };