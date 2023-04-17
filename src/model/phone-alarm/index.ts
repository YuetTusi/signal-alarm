import { phoneAlarm } from './phone-alarm';
import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';

interface PhoneAlarmState {
    /**
     * 报红手机数据
     */
    phoneAlarmData: PhoneAlarmInfo[],
    /**
     * 接收推送
     */
    setPhoneAlarmData: (payload: PhoneAlarmInfo[]) => void,
    /**
     * 移除手机数据
     * @param hash 
     */
    removePhoneAlarmData: (hash: string) => void
}

export type { PhoneAlarmState };
export { phoneAlarm };