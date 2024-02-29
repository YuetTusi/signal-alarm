import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { phoneAlarm } from './phone-alarm';

interface PhoneAlarmState {

    /**
     * 使用声音
     */
    sound: boolean,
    /**
     * 报红数据
     */
    phoneAlarmData: PhoneAlarmInfo[],
    /**
     * 设置声音
     */
    setSound: (payload: boolean) => void,
    /**
     * 更新
     */
    setPhoneAlarmData: (payload: PhoneAlarmInfo[]) => void,
    /**
     * 追加报警信息
     * @param payload 推送数据
     */
    appendPhoneAlarmData: (payload: PhoneAlarmInfo) => void,
    /**
     * 移除手机数据
     * @param id 
     */
    removePhoneAlarmData: (id: string) => void,
    /**
     * 清空报警消息
     */
    clearPhoneAlarmData: () => void
}

export type { PhoneAlarmState };
export { phoneAlarm };