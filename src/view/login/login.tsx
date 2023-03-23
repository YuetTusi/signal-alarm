import hash from 'shorthash';
import { FC, MouseEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Input, Button, Form, message } from 'antd';
import { useModel } from "@/model";
import DragBar from '@/component/drag-bar';
import Reading from '@/component/reading';
import { LoginBox } from "./styled/styled";
import { FormValue } from "./prop";

const { Item, useForm } = Form;
const { Password } = Input;

const Login: FC<{}> = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [formRef] = useForm<FormValue>();
    const {
        setLoginUserName,
        loginByNamePassword
    } = useModel(state => ({
        setLoginUserName: state.setLoginUserName,
        loginByNamePassword: state.loginByNamePassword
    }));

    /**
     * 登录
     */
    const onLoginSubmit = async (event: MouseEvent) => {
        event.preventDefault();
        message.destroy();
        try {
            const { userName, password } = await formRef.validateFields();
            setLoading(true);
            const ret = await loginByNamePassword(userName, password);
            if (ret === null) {
                message.warning('登录失败');
                return;
            }

            if (ret.code === 200) {
                message.success('登录成功');
                setLoginUserName(userName);
                sessionStorage.setItem('token', ret.data.token ?? '');
                sessionStorage.setItem('sh', hash.unique(userName));
                sessionStorage.setItem('user', userName);
                navigate('/dashboard');
            } else {
                message.warning(`登录失败（${ret.message}）`);
            }
        } catch (error) {
            if (error.errorFields) {
                console.warn(error);
            } else {
                message.warning(`登录失败（${error.message}）`);
            }
        } finally {
            setLoading(false);
        }
    };

    return <>
        <DragBar>信号哨兵长时检测系统</DragBar>
        <Reading />
        <LoginBox>
            <h3>登录</h3>
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
                                disabled={loading}
                                type="primary"
                                block={true}
                            >
                                {loading ? <LoadingOutlined /> : <UserOutlined />}
                                <span>登录</span>
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                onClick={() => {
                                    formRef.resetFields();

                                }}
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
    </>
}

export { Login };