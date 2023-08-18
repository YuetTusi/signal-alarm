import { FC } from 'react';
import { Modal } from 'antd';
import { ReportTable } from './report-table';
import { ReportDetailModalProp } from './prop';
import { ModalBox } from './styled/box';

/**
 * 报告详情框
 */
const ReportDetailModal: FC<ReportDetailModalProp> = ({ open, onCancel }) => {


    return <Modal
        onCancel={onCancel}
        open={open}
        footer={null}
        title="检查报告详情"
        width={1330}
        centered={true}
        maskClosable={false}
        destroyOnClose={true}
        getContainer="#app">
        <ModalBox>
            <ReportTable />
        </ModalBox>
    </Modal>
};

export { ReportDetailModal };