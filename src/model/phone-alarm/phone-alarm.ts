import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { GetState, SetState } from '..';
import { PhoneAlarmState } from '.';

const phoneAlarm = (setState: SetState, getState: GetState): PhoneAlarmState => ({

    /**
     * 用户ID
     */
    phoneAlarmData: [],
    /**
     * 接收推送
     */
    setPhoneAlarmData: (payload: PhoneAlarmInfo[]) => {
        setState({ phoneAlarmData: payload });
    },
    /**
     * 移除手机数据
     * @param hash 
     */
    removePhoneAlarmData: (hash: string) => {
        const { phoneAlarmData } = getState();
        setState({
            phoneAlarmData: phoneAlarmData.filter(item => item.hash !== hash)
        });
    }
});

export { phoneAlarm };