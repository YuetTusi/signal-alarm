import { message } from 'antd';
import { request } from '@/utility/http';
import { AlarmWeek } from '@/schema/alarm-week';
import { GetState, SetState } from '..';
import { AlarmWeekStatisState } from './index';

const alarmWeekStatis = (setState: SetState, _: GetState): AlarmWeekStatisState => ({

    /**
     * 7天告警数量图表数据
     */
    alarmWeekStatisData: [],
    /**
     * 查询7天告警数量图表数据
     */
    queryAlarmWeekStatisData: async () => {
        message.destroy();
        try {
            const res = await request.get<AlarmWeek[]>('/statis/warn/week');

            if (res === null) {
                message.warning('查询失败');
            } else if (res.code === 200) {
                setState({ alarmWeekStatisData: res.data });
            } else {
                message.warning(`查询失败（${res.message}）`);
            }
        } catch (error) {
            message.warning(`查询失败（${error.message}）`);
        }
    }
});


export { alarmWeekStatis };