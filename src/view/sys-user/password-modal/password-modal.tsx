import { FC, useEffect } from 'react';
import { Button, Input, Form, Modal } from 'antd';
import { FormValue, PasswordModalProp } from './prop';

const { Item } = Form;
const { Password } = Input;

/**
 * 修改密码
 */
const PasswordModal: FC<PasswordModalProp> = ({ open, data, onCancel, onOk }) => {

    const [formRef] = Form.useForm<FormValue>();

    useEffect(() => {
        if (!open) {
            formRef.resetFields();
        }
    }, [open]);

    const onSubmit = async () => {

        const { validateFields } = formRef;

        try {
            const values = await validateFields();
            onOk(data?.id ?? 0, values.newPassword, values.password);
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
        title="修改密码"
        getContainer="#app"
        width={500}
        centered={true}
        maskClosable={false}
        destroyOnClose={false}>
        <Form
            form={formRef}
            layout="vertical"
            style={{ marginTop: '20px' }}>
            <Item
                rules={[
                    { required: true, message: '请填写原密码' }
                ]}
                label="原密码"
                name="password">
                <Password />
            </Item>
            <Item
                rules={[
                    { required: true, message: '请填写新密码' }
                ]}
                label="新密码"
                name="newPassword">
                <Password />
            </Item>
            <Item
                rules={[
                    { required: true, message: '请填写确认密码' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('确认密码与密码不一致'));
                        }
                    })
                ]}
                label="确认密码"
                name="rePassword">
                <Password placeholder="请与密码输入一致" />
            </Item>
        </Form>
    </Modal>
};

export { PasswordModal };