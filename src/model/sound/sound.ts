import { GetState, SetState } from '..';
import { SoundState } from '../sound';

const sound = (setState: SetState, _: GetState): SoundState => ({

    sound: false,

    setSound(payload: boolean) {
        setState({ sound: payload });
    }
});

export { sound };