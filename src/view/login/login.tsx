import { FC, MouseEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, App } from 'antd';
import { LoginBox } from "./styled/styled";
import { useForm } from "antd/es/form/Form";
import { FormValue } from "./prop";

const { Item } = Form;
const { Password } = Input;

const Login: FC<any> = () => {

    const navigate = useNavigate();
    const [formRef] = useForm<FormValue>();
    const { message } = App.useApp();

    const onLoginSubmit = async (event: MouseEvent) => {
        event.preventDefault();
        try {
            const { userName, password } = await formRef.validateFields();
            message.destroy();
            if (userName === 'admin' && password === '111111') {
                message.success('登录成功');
                navigate('/dashboard');
            } else {
                message.warning('登录失败，请检查用户与密码');
            }
        } catch (error) {
            console.warn(error);
        }
    };

    return <LoginBox>
        <Form
            form={formRef}
            style={{ width: '240px' }}
            layout="vertical">
            <Item
                rules={[{
                    required: true,
                    message: '请填写用户'
                }]}
                name="userName"
                label="用户">
                <Input />
            </Item>
            <Item
                rules={[{
                    required: true,
                    message: '请填写密码'
                }]}
                name="password"
                label="密码">
                <Password />
            </Item>
            <Item>
                <Button
                    onClick={onLoginSubmit}
                    type="primary">登录</Button>
            </Item>
        </Form>
    </LoginBox>
}

export { Login };