import { create, StoreApi } from 'zustand';
import { reading, ReadingState } from './reading';
import { login, LoginState } from './login';

interface OtherState {
    [stateName: string]: any
}

type State = OtherState
    & ReadingState
    & LoginState;
type GetState = StoreApi<State>['getState'];
type SetState = StoreApi<State>['setState'];


const useModel = create((setState: SetState, getState: GetState) => ({

    ...reading(setState, getState),
    ...login(setState, getState)
}));

export type { State, GetState, SetState };
export { useModel };
export default useModel;