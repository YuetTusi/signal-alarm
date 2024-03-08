import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { GetState, SetState } from '..';
import { PhoneAlarmState } from '.';

const phoneAlarm = (setState: SetState, getState: GetState): PhoneAlarmState => ({

    /**
     * 用户ID
     */
    phoneAlarmData: [
        // JSON.parse("{\"data\":{\"siteName\":\"电科大厦A座11层\",\"arfcn\":1765.0,\"captureTime\":\"2023-08-16T15:00:05\",\"deviceId\":\"RS_177\",\"protocol\":\"中国电信FDD-LTE\",\"protocolType\":7,\"rssi\":-40,\"status\":0,\"warnLevel\":1,\"warnReason\":\"中国电信FDD\"}}")
    ],
    /**
     * 接收推送
     */
    setPhoneAlarmData: (payload: PhoneAlarmInfo[]) => {
        setState({ phoneAlarmData: payload });
    },
    /**
     * 追加报警信息
     * @param payload 推送数据
     */
    appendPhoneAlarmData: (payload: PhoneAlarmInfo) => {
        const { phoneAlarmData } = getState();
        setState({ phoneAlarmData: phoneAlarmData.concat([payload]) });
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
    },
    /**
     * 清空报警消息
     */
    clearPhoneAlarmData: () => {
        setState({ phoneAlarmData: [] });
    }
});

export { phoneAlarm };