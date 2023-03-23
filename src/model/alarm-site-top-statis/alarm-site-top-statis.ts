import { GetState, SetState } from '..';
import { AlarmSiteTopStatisState } from './index';
import { message } from 'antd';
import { request } from '@/utility/http';
import { AlarmSiteTop } from '@/schema/alarm-site-top';

const alarmSiteTopStatis = (setState: SetState, _: GetState): AlarmSiteTopStatisState => ({

    alarmSiteTopStatisData: [],
    /**
     * 查询告警场所Top10（玫瑰图）
     */
    queryAlarmSiteTopStatisData: async () => {
        message.destroy();
        try {
            const res = await request.get<AlarmSiteTop[]>('/statis/warn/sitetop');

            if (res === null) {
                message.warning('查询失败');
            } else if (res.code === 200) {
                setState({ alarmSiteTopStatisData: res.data });
            } else {
                message.warning(`查询失败（${res.message}）`);
            }
        } catch (error) {
            message.warning(`查询失败（${error.message}）`);
        }
    }
});


export { alarmSiteTopStatis };