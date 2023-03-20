import { FC, MouseEvent, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { useModel } from '@/model';
import DataTable from '../data-table';
import { DetailModalProp } from './prop';

/**
 * 专项检查详情框
 */
const DetailModel: FC<DetailModalProp> = ({ open, onCancel, onOk }) => {

    useEffect(() => {
        if (open) {
            querySpecialWapTop10Data();
        }
    }, [open]);

    const {
        querySpecialWapTop10Data
    } = useModel(state => ({
        querySpecialWapTop10Data: state.querySpecialWapTop10Data
    }));

    // const onOkClick = (event: MouseEvent) => {
    //     event.preventDefault();
    //     onOk();
    // };

    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        onCancel();
    };

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="SDM_0">取消</Button>
            // <Button onClick={onOkClick} type="primary" key="SDM_1">确定</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        width={1000}
        getContainer="#app"
        title="专项检查详情"
        centered={true}
        destroyOnClose={true}
        maskClosable={false}
        forceRender={true}
    >
        <DataTable />
    </Modal>
};

export { DetailModel };