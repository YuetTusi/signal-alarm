import { create, StoreApi } from 'zustand';
import { zustandLog } from '@/utility/zustand-log';
import { reading, ReadingState } from './reading';
import { specialWap, SpecialWapState } from './special-wap';
import { specialHotspot, SpecialHotspotState } from './special-hotspot';
import { specialTerminal, SpecialTerminalState } from './special-terminal';
import { alarm, AlarmState } from './alarm';
import { alarmTypeStatis, AlarmTypeStatisState } from './alarm-type-statis';
import { alarmSiteTopStatis, AlarmSiteTopStatisState } from './alarm-site-top-statis';
import { specialTypeStatis, SpecialTypeStatisState } from './special-type-statis';
import { alarmWeekStatis, AlarmWeekStatisState } from './alarm-week-statis';
import { quickCheck, QuickCheckState } from './quick-check';
import { login, LoginState } from './login';
import { phoneAlarm, PhoneAlarmState } from './phone-alarm';

interface OtherState {
    [stateName: string]: any
}

/**
 * State tree
 */
type State = OtherState
    & ReadingState
    & LoginState
    & SpecialWapState
    & SpecialHotspotState
    & SpecialTerminalState
    & AlarmState
    & AlarmTypeStatisState
    & AlarmSiteTopStatisState
    & SpecialTypeStatisState
    & AlarmWeekStatisState
    & QuickCheckState
    & PhoneAlarmState;

type GetState = StoreApi<State>['getState'];
type SetState = StoreApi<State>['setState'];

/**
 * 使用仓库model
 */
const useModel = create<State>(zustandLog((setState: SetState, getState: GetState) => ({

    ...reading(setState, getState),
    ...login(setState, getState),
    ...specialWap(setState, getState),
    ...specialHotspot(setState, getState),
    ...specialTerminal(setState, getState),
    ...alarm(setState, getState),
    ...alarmTypeStatis(setState, getState),
    ...alarmSiteTopStatis(setState, getState),
    ...specialTypeStatis(setState, getState),
    ...alarmWeekStatis(setState, getState),
    ...quickCheck(setState, getState),
    ...phoneAlarm(setState, getState)
}), false));

export type { State, GetState, SetState };
export { useModel };
export default useModel;