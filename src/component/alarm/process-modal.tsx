import { FC, MouseEvent } from 'react';
import { Modal, Button, Form, Input, Divider } from 'antd';
import { AlarmDesc } from './alarm-desc';
import { ProcessModalProp } from './prop';

const { Item, useForm } = Form;

/**
 * 处理预警信息框
 */
const ProcessModal: FC<ProcessModalProp> = ({ open, data, onOk, onCancel }) => {

    const [formRef] = useForm<{ remark: string }>();

    const onOkClick = (event: MouseEvent) => {
        event.preventDefault();
        const values = formRef.getFieldsValue();
        onOk(data!, values.remark);
        formRef.resetFields();
    };

    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        formRef.resetFields();
        onCancel();
    };

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="PDM_0">取消</Button>,
            <Button onClick={onOkClick} type="primary" key="PDM_1">确定</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        title="处理预警"
        getContainer="#app"
        centered={true}
        destroyOnClose={true}
        maskClosable={false}
        width={600}
    >
        <AlarmDesc data={data!} />
        <Divider />
        <Form form={formRef} layout="vertical">
            <Item name="remark" label="处理记录">
                <Input placeholder="请填写本次处理记录" />
            </Item>
        </Form>
    </Modal>
};

export { ProcessModal };