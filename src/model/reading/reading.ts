import { GetState, SetState } from "..";

const reading = (setState: SetState, _: GetState) => ({

    reading: false,

    setReading: (payload: boolean) => {
        setState({ reading: payload });
    }
});

export { reading };