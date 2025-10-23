import { FC, MouseEvent } from 'react';
import { Button, Input, Form, Modal } from 'antd';
import { UserPassword } from '@/utility/regex';
import { FormValue, ModifyPasswordModalProp } from './prop';

const { Password } = Input;
const { useForm, Item } = Form;

/**
 * 密码修改框
 */
const ModifyPasswordModal: FC<ModifyPasswordModalProp> = ({
    open, onCancel, onOk
}) => {

    const [formRef] = useForm<FormValue>();

    const onOkClick = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { resetFields, validateFields } = formRef;
        try {
            const { newPassword, oldPassword } = await validateFields();
            onOk(oldPassword, newPassword);
            resetFields();
        } catch (error) {
            console.warn(error);
        }
    };

    const onCancelClick = () => {
        formRef.resetFields();
        onCancel();
    }

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="MPM_0">取消</Button>,
            <Button onClick={onOkClick} type="primary" key="MPM_1">确定</Button>
        ]}
        open={open}
        onCancel={onCancelClick}
        centered={true}
        destroyOnHidden={true}
        maskClosable={false}
        forceRender={true}
        width={420}
        getContainer="#app"
        title="修改密码">
        <Form form={formRef} layout="vertical" style={{ marginTop: '2rem' }}>
            <Item
                rules={[
                    { required: true, message: '请填写原密码' }
                ]}
                label="原密码"
                name="oldPassword">
                <Password placeholder="请填写原密码" />
            </Item>
            <Item
                rules={[
                    { required: true, message: '请填写新密码' },
                    { pattern: UserPassword, message: '密码6位以上' }
                ]}
                label="新密码"
                name="newPassword">
                <Password placeholder="请填写新密码，6位以上" />
            </Item>
            <Item
                rules={[
                    { required: true, message: '请填写确认密码' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('确认密码与新密码不一致'));
                        }
                    })
                ]}
                dependencies={['newPassword']}
                label="确认密码"
                name="confirmPassword">
                <Password placeholder="与新密码一致" />
            </Item>
        </Form>
    </Modal>;
};

export { ModifyPasswordModal };