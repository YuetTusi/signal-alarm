import { create, StoreApi } from 'zustand';
import { reading, ReadingState } from './reading';
import { specialWap, SpecialWapState } from './special-wap';
import { login, LoginState } from './login';

interface OtherState {
    [stateName: string]: any
}

type State = OtherState
    & ReadingState
    & LoginState
    & SpecialWapState;
type GetState = StoreApi<State>['getState'];
type SetState = StoreApi<State>['setState'];


const useModel = create((setState: SetState, getState: GetState) => ({

    ...reading(setState, getState),
    ...login(setState, getState),
    ...specialWap(setState, getState)
}));

export type { State, GetState, SetState };
export { useModel };
export default useModel;