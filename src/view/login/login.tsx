import { FC, MouseEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { KeyOutlined, ReloadOutlined } from '@ant-design/icons';
import { Col, Row, Input, Button, Form, App } from 'antd';
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
                <Row gutter={24} style={{ marginTop: '1rem' }}>
                    <Col span={12}>
                        <Button
                            onClick={onLoginSubmit}
                            type="primary"
                            block={true}
                        >
                            <KeyOutlined />
                            <span>登录</span>
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => formRef.resetFields()}
                            type="primary"
                            block={true}>
                            <ReloadOutlined />
                            <span>重置</span>
                        </Button>
                    </Col>
                </Row>


            </Item>
        </Form>
    </LoginBox>
}

export { Login };