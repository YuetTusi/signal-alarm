import { GetState, SetState } from '..';
import { SpecialTypeStatisState } from './index';
import { message } from 'antd';
import { request } from '@/utility/http';
import { SpecialType } from '@/schema/special-type';


const specialTypeStatis = (setState: SetState, _: GetState): SpecialTypeStatisState => ({

    /**
     * 专项检查分类图表数据
     */
    specialTypeStatisData: [],
    /**
     * 查询专项检查分类图表数据
     */
    querySpecialTypeStatisData: async () => {
        message.destroy();
        try {
            const res = await request.get<SpecialType[]>('/statis/spi/class');

            if (res === null) {
                message.warning('查询失败');
            } else if (res.code === 200) {
                setState({ specialTypeStatisData: res.data });
            } else {
                message.warning(`查询失败（${res.message}）`);
            }
        } catch (error) {
            message.warning(`查询失败（${error.message}）`);
        }
    }
});


export { specialTypeStatis };