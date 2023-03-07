import { GetState, SetState } from "..";

const reading = (setState: SetState, getState: GetState) => ({

    reading: false,

    setReading: (payload: boolean) => {
        setState({ reading: payload });
    }
});

export { reading };