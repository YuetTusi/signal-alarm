import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { GetState, SetState } from '..';
import { PhoneAlarmState } from '.';

const phoneAlarm = (setState: SetState, getState: GetState): PhoneAlarmState => ({

    sound: false,
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
     * 设置声音
     */
    setSound: (payload: boolean) => {
        setState({ sound: payload });
    },
    /**
     * 追加报警信息
     * @param payload 推送数据
     */
    appendPhoneAlarmData: (payload: PhoneAlarmInfo) => {
        const { phoneAlarmData } = getState();
        setState({ phoneAlarmData: [...phoneAlarmData, payload] });
    },
    /**
     * 移除手机数据
     * @param id 
     */
    removePhoneAlarmData: (id: string) => {
        const { phoneAlarmData } = getState();
        setState({
            phoneAlarmData: phoneAlarmData.filter(item => item.id !== id)
        });
    }
});

export { phoneAlarm };