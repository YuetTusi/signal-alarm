import { phoneAlarm } from './phone-alarm';
import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';

interface PhoneAlarmState {
    /**
     * 报红手机数据
     */
    phoneAlarmData: PhoneAlarmInfo[],
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
    removePhoneAlarmData: (id: string) => void
}

export type { PhoneAlarmState };
export { phoneAlarm };