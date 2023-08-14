import { FC, MouseEvent } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { BoxPanel } from '@/component/panel';
import { PasswordModalProp, FormValue } from './prop';

const { useForm, Item } = Form;
const { Password } = Input;

/**
 * 密码修改Modal
 */
const PasswordModal: FC<PasswordModalProp> = ({ open, onOk, onCancel }) => {

    const [formRef] = useForm<FormValue>();

    const onSubmit = async (event: MouseEvent) => {
        event.preventDefault();
        try {
            const { newPassword } = await formRef.validateFields();
            onOk(newPassword);
        } catch (error) {
            console.warn(error);
        }
    };

    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        formRef.resetFields();
        onCancel();
    }

    return <Modal
        footer={[
            <Button onClick={onSubmit} type="primary" key="PM_0">确定</Button>,
            <Button onClick={onCancelClick} type="default" key="PM_1">取消</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        title="修改密码"
        centered={true}
        maskClosable={false}
        destroyOnClose={true}
        forceRender={true}
        width={390}
    >
        <BoxPanel padding={10}>
            <div className="content">
                <Form form={formRef} layout="vertical" style={{ width: 320 }}>
                    <Item
                        rules={[
                            { required: true, message: '请填写原密码' }
                        ]}
                        name="originPassword"
                        label="原密码">
                        <Password />
                    </Item>
                    <Item
                        rules={[
                            { required: true, message: '请填写新密码' }
                        ]}
                        name="newPassword"
                        label="新密码">
                        <Password />
                    </Item>
                    <Item
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value === getFieldValue('newPassword')) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject('与新密码不一致');
                                    }
                                },
                            })
                        ]}
                        name="confirmPassword"
                        label="确认密码">
                        <Password />
                    </Item>
                </Form>
            </div>
        </BoxPanel>
    </Modal>
};

export { PasswordModal };