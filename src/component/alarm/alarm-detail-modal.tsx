import { FC, MouseEvent } from 'react';
import { Modal, Button } from 'antd';
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
        footer={[
            <Button onClick={onCancelClick} type="default" key="ADIM_0">取消</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        title="预警详情"
        getContainer="#app"
        centered={true}
        destroyOnClose={true}
        maskClosable={false}
        width={600}
    >
        <AlarmDesc data={data!} />
    </Modal>
};

export { AlarmDetailModal };