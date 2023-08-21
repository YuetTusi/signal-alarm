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
        footer={null}
        onCancel={onCancelClick}
        open={open}
        title="预警信息详情"
        getContainer="#app"
        centered={true}
        destroyOnClose={true}
        maskClosable={false}
        width={1380}
    >
        <AlarmTable />
    </Modal>
};

export { DetailModal };