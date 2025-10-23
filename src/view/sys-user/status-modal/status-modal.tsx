import { FC, useEffect } from 'react';
import { Button, Form, Modal, Radio } from 'antd';
import { FormValue, StatusProp } from './prop';

const { Item } = Form;
const { Group } = Radio;

/**
 * 修改状态
 */
const StatusModal: FC<StatusProp> = ({ open, data, onCancel, onOk }) => {

    const [formRef] = Form.useForm<FormValue>();

    useEffect(() => {
        if (open) {
            formRef.setFieldsValue({ status: data?.status ?? 1 });
        } else {
            formRef.resetFields();
        }
    }, [open]);

    const onSubmit = async () => {

        const { validateFields } = formRef;

        try {
            const values = await validateFields();
            onOk(data?.id ?? 0, values.status);
        } catch (error) {
            console.log(error);
        }
    };

    return <Modal
        footer={[
            <Button
                onClick={() => {
                    formRef.resetFields();
                    onCancel();
                }}
                type="default"
                key="PM_0">取消</Button>,
            <Button
                onClick={() => onSubmit()}
                type="primary"
                key="PM_1">确定</Button>
        ]}
        open={open}
        onCancel={() => {
            formRef.resetFields();
            onCancel();
        }}
        title="修改状态"
        getContainer="#app"
        width={500}
        centered={true}
        maskClosable={false}
        destroyOnHidden={false}>
        <Form
            form={formRef}
            layout="inline"
            style={{ marginTop: '20px' }}>
            <Item
                rules={[
                    { required: true, message: '请填写选择状态' }
                ]}
                label="状态"
                name="status">
                <Group>
                    <Radio value={0}>
                        <span style={{ marginRight: '20px' }}>停用</span>
                    </Radio>
                    <Radio value={1}>
                        <span>正常</span>
                    </Radio>
                </Group>
            </Item>
        </Form>
    </Modal>
};

export { StatusModal };