import { GetState, SetState } from '..';
import { AlarmTypeStatisState } from './index';
import { request } from '@/utility/http';
import { AlarmType } from '@/schema/alarm-type';
import { message } from 'antd';

const alarmTypeStatis = (setState: SetState, _: GetState): AlarmTypeStatisState => ({

    alarmTypeStatisData: [],
    /**
     * 查询告警类型统计数据
     */
    queryAlarmTypeStatis: async () => {
        message.destroy();
        try {
            const res = await request.get<AlarmType[]>('/statis/warn/type');

            if (res === null) {
                message.warning('查询失败');
            } else if (res.code === 200) {
                setState({ alarmTypeStatisData: res.data });
            } else {
                message.warning(`查询失败（${res.message}）`);
            }
        } catch (error) {
            message.warning(`查询失败（${error.message}）`);
        }
    }
});


export { alarmTypeStatis };