import { FC, MouseEvent, useEffect } from 'react';
import { Modal } from 'antd';
import { useModel } from '@/model';
import { AlarmTable } from './alarm-table';
import { DetailModalProp } from './prop';

/**
 * 预警信息详细
 */
const DetailModal: FC<DetailModalProp> = ({ open, onCancel }) => {

    const {
        queryDeviceList
    } = useModel(state => ({
        queryDeviceList: state.queryDeviceList
    }));

    useEffect(() => {
        if (open) {
            queryDeviceList();
        }
    }, [open]);

    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        onCancel();
    };

    return <Modal
        footer={null}
        onCancel={onCancelClick}
        open={open}
        title="频段告警详情"
        getContainer="#app"
        centered={true}
        destroyOnClose={true}
        maskClosable={false}
        width={1640}
    >
        <AlarmTable />
    </Modal>
};

export { DetailModal };