import { FC, useRef } from 'react';
import { Button, Modal } from 'antd';
import { Map } from '@/component/map';
import { PointModalProp } from './prop';

/**
 * 地图打点Modal
 */
const PointModal: FC<PointModalProp> = ({
    open, x, y, background, onCancel, onOk
}) => {

    const point = useRef<[number, number]>([0, 0]);

    const onAddPoint = (x: number, y: number) =>
        point.current = [x, y];

    return <Modal
        footer={[
            <Button onClick={onCancel} type="default" key="PM_0">取消</Button>,
            <Button onClick={() => {
                const [x, y] = point.current;
                onOk(x, y);
            }}
                type="primary"
                key="PM_1">
                确定
            </Button>
        ]}
        onCancel={onCancel}
        open={open}
        centered={true}
        maskClosable={false}
        forceRender={false}
        destroyOnClose={true}
        getContainer="#app"
        width={1060}
        title="设备位置">
        <Map
            x={x}
            y={y}
            onAddPoint={onAddPoint}
            background={background} />

    </Modal>
};

export { PointModal };