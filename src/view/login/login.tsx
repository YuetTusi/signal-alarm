import hash from 'shorthash';
import localforage from 'localforage';
import { FC, MouseEvent, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UserOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Input, Button, Checkbox, Form, message } from 'antd';
import { useModel } from "@/model";
import DragBar from '@/component/drag-bar';
import Reading from '@/component/reading';
import { LoginBox, LoginOuterBox } from "./styled/styled";
import { FormValue } from "./prop";

const { Item, useForm } = Form;
const { Password } = Input;

const Login: FC<{}> = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [formRef] = useForm<FormValue>();
    const {
        loginRemember,
        setLoginUserName,
        setLoginRemember,
        loginByNamePassword
    } = useModel(state => ({
        loginRemember: state.loginRemember,
        setLoginRemember: state.setLoginRemember,
        setLoginUserName: state.setLoginUserName,
        loginByNamePassword: state.loginByNamePassword
    }));

    useEffect(() => {
        (async () => {
            try {
                const [token, hash, user] = await Promise.all([
                    localforage.getItem<string>('token'),
                    localforage.getItem<string>('sh'),
                    localforage.getItem<string>('user'),
                ]);
                if (token !== null && hash !== null && user !== null) {
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('sh', hash);
                    sessionStorage.setItem('user', user);
                    navigate('/dashboard');
                }
            } catch (error) {
                console.warn(error);
            }
        })();
    }, []);

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
                if (loginRemember) {
                    //如果记住登录状态，将token写入localStorage
                    localforage.setItem('token', ret.data.token ?? '');
                    localforage.setItem('sh', hash.unique(userName));
                    localforage.setItem('user', userName);
                }
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
        <LoginOuterBox>
            <LoginBox>
                <h3>用户登录</h3>
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
                        <Row gutter={16}>
                            <Col flex="none">
                                <Checkbox
                                    onChange={(event) => setLoginRemember(event.target.checked)}
                                    checked={loginRemember}
                                    style={{ verticalAlign: 'text-top' }} />
                            </Col>
                            <Col flex={1}><label>记住密码</label></Col>
                        </Row>
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
                                        setLoginRemember(false);
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
        </LoginOuterBox>

    </>
}

export { Login };