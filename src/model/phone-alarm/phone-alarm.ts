import { GetState, SetState } from '..';
import { PhoneAlarmState } from '.';

const phoneAlarm = (setState: SetState, _: GetState): PhoneAlarmState => ({

    /**
     * 用户ID
     */
    phoneAlarmData: [],
    /**
     * 接收推送
     */
    setPhoneAlarmData: (payload: any[]) => {
        setState({ phoneAlarmData: payload });
    }
});

export { phoneAlarm };