export interface PointModalProp {

    open: boolean,

    x: number,
    y: number,

    background: string,

    onCancel: () => void,

    onOk: (x: number, y: number) => void
}