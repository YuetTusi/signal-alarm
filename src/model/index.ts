import { create, StoreApi } from 'zustand';
import { reading, ReadingState } from './reading';

interface OtherState {
    [stateName: string]: any
}

type State = OtherState
    & ReadingState;
type GetState = StoreApi<State>['getState'];
type SetState = StoreApi<State>['setState'];


const useModel = create((setState: SetState, getState: GetState) => ({

    ...reading(setState, getState)
}));

export type { State, GetState, SetState };
export { useModel };
export default useModel;