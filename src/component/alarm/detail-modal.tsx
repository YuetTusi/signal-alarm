import { FC, MouseEvent } from 'react';
import { Modal, Button } from 'antd';
import { AlarmTable } from './alarm-table';
import { DetailModalProp } from './prop';

/**
 * 预警信息详细
 */
const DetailModal: FC<DetailModalProp> = ({ open, onCancel }) => {

    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        onCancel();
    };

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="ADM_0">取消</Button>
            // <Button onClick={onOkClick} type="primary" key="SDM_1">确定</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        title="预警信息详细"
        getContainer="#app"
        centered={true}
        destroyOnClose={true}
        maskClosable={false}
        width={1080}
    >
        <AlarmTable />
    </Modal>
};

export { DetailModal };