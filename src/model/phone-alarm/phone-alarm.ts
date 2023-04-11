import { GetState, SetState } from '..';
import { PhoneAlarmState } from '.';
import { instance, close } from '@/utility/sse';
import { StorageKeys } from '@/utility/storage-keys';

// let sse: EventSource | null = null;
// const userId = sessionStorage.getItem(StorageKeys.UserId);
// const hash = sessionStorage.getItem(StorageKeys.Hash);

// if (userId !== null && hash !== null) {
//     sse = instance();
// }

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