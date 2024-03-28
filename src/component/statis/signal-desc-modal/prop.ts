import { ContinuousSignal } from "@/schema/continuous-signal"

export interface SignalDescModalProp {
    open: boolean,
    data?: ContinuousSignal,
    onCancel: () => void
}