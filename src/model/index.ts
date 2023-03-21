import { create, StoreApi } from 'zustand';
import { reading, ReadingState } from './reading';
import { specialWap, SpecialWapState } from './special-wap';
import { specialHotspot, SpecialHotspotState } from './special-hotspot';
import { specialTerminal, SpecialTerminalState } from './special-terminal';
import { alarm, AlarmState } from './alarm';
import { login, LoginState } from './login';

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
    & AlarmState;
type GetState = StoreApi<State>['getState'];
type SetState = StoreApi<State>['setState'];


const useModel = create((setState: SetState, getState: GetState) => ({

    ...reading(setState, getState),
    ...login(setState, getState),
    ...specialWap(setState, getState),
    ...specialHotspot(setState, getState),
    ...specialTerminal(setState, getState),
    ...alarm(setState, getState)
}));

export type { State, GetState, SetState };
export { useModel };
export default useModel;