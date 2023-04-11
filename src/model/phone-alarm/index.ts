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
    setPhoneAlarmData: (payload: PhoneAlarmInfo[]) => void
}

export type { PhoneAlarmState };
export { phoneAlarm };