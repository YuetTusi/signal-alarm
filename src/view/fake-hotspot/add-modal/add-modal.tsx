import { FC } from 'react';
import { Button, Modal, Form } from 'antd';
import { FakeHotspot } from '@/schema/fake-hotspot';
import { AddForm } from './add-form';
import { AddModalProp } from './prop';

const { useForm } = Form;

/**
 * 添加伪热点框
 */
export const AddModal: FC<AddModalProp> = ({ open, onOk, onClose }) => {

    const [formRef] = useForm<FakeHotspot>();

    const onSubmit = async () => {
        const { resetFields, validateFields } = formRef;
        try {
            const values = await validateFields();
            onOk(values);
            resetFields();
        } catch (error) {
            console.warn(error);
        }
    };

    const onCancelClick = () => {
        formRef.resetFields();
        onClose();
    };

    return <Modal
        footer={[
            <Button onClick={onSubmit} type="primary" key="FAM_0">确定</Button>,
            <Button onClick={onCancelClick} type="default" key="FAM_1">取消</Button>
        ]}
        onCancel={onCancelClick}
        width={400}
        open={open}
        title="添加伪热点"
        getContainer="#app"
        centered={true}
        maskClosable={false}
        destroyOnClose={true}>
        <AddForm formRef={formRef} />
    </Modal>;
};