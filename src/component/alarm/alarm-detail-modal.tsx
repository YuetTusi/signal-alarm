import { FC, MouseEvent } from 'react';
import { Modal } from 'antd';
import { AlarmDesc } from './alarm-desc';
import { AlarmDetailModalProp } from './prop';

/**
 * 单条详情框
 */
const AlarmDetailModal: FC<AlarmDetailModalProp> = ({ open, data, onCancel }) => {

    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        onCancel();
    };

    return <Modal
        footer={null}
        onCancel={onCancelClick}
        open={open}
        title="预警详情"
        getContainer="#app"
        centered={true}
        destroyOnHidden={true}
        maskClosable={false}
        width={600}
    >
        <AlarmDesc data={data!} />
    </Modal>
};

export { AlarmDetailModal };