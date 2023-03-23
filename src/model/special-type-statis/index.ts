import { SpecialType } from "@/schema/special-type";
import { specialTypeStatis } from './special-type-statis';

interface SpecialTypeStatisState {

    /**
     * 专项检查分类图表数据
     */
    specialTypeStatisData: SpecialType[]
    /**
     * 查询专项检查分类图表数据
     */
    querySpecialTypeStatisData: () => void
}


export type { SpecialTypeStatisState };
export { specialTypeStatis };