import localforage from 'localforage';
import { FC, MouseEvent, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UserOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Input, Button, Checkbox, Form, message } from 'antd';
import { useModel } from "@/model";
import { helper } from '@/utility/helper';
import { StorageKeys } from '@/utility/storage-keys';
import DragBar from '@/component/drag-bar';
import Reading from '@/component/reading';
import { BackgroundBox, LoginBox, LoginOuterBox } from "./styled/styled";
import { FormValue } from "./prop";

const { Item, useForm } = Form;
const { Password } = Input;

const Login: FC<{}> = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [formRef] = useForm<FormValue>();
    const {
        loginRemember,
        setLoginUserId,
        setLoginUserName,
        setLoginRemember,
        loginByNamePassword,
        queryLoginUserInfo
    } = useModel(state => ({
        loginRemember: state.loginRemember,
        setLoginUserId: state.setLoginUserId,
        setLoginRemember: state.setLoginRemember,
        setLoginUserName: state.setLoginUserName,
        loginByNamePassword: state.loginByNamePassword,
        queryLoginUserInfo: state.queryLoginUserInfo
    }));

    useEffect(() => {
        (async () => {
            try {
                const [token, hash, user] = await Promise.all([
                    localforage.getItem<string>(StorageKeys.Token),
                    localforage.getItem<string>(StorageKeys.Hash),
                    localforage.getItem<string>(StorageKeys.User),
                ]);
                if (token !== null && hash !== null && user !== null) {
                    sessionStorage.setItem(StorageKeys.Token, token);
                    sessionStorage.setItem(StorageKeys.Hash, hash);
                    sessionStorage.setItem(StorageKeys.User, user);
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
                sessionStorage.setItem(StorageKeys.Token, ret.data.token ?? '');
                const res = await queryLoginUserInfo();
                if (res !== null && res.code === 200) {
                    setLoginUserName(res.data.name);
                    setLoginUserId(res.data.userId.toString());
                    const userHash = helper.md5(res.data.userId.toString());
                    sessionStorage.setItem(StorageKeys.Hash, userHash);
                    sessionStorage.setItem(StorageKeys.User, res.data.name);
                    sessionStorage.setItem(StorageKeys.UserId, res.data.userId.toString());
                    if (loginRemember) {
                        //如果记住登录状态，将token写入localStorage
                        localforage.setItem(StorageKeys.Token, ret.data.token ?? '');
                        localforage.setItem(StorageKeys.Hash, userHash);
                        localforage.setItem(StorageKeys.User, res.data.name);
                        localforage.setItem(StorageKeys.UserId, res.data.userId.toString());
                    }
                    navigate('/dashboard');
                } else {
                    message.warning(`登录失败（${res?.message ?? ''}）`);
                }
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
        <BackgroundBox>
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
                                        style={{ verticalAlign: 'text-top' }} >
                                        <label onClick={() => setLoginRemember(!loginRemember)}>记住密码</label>
                                    </Checkbox>
                                </Col>
                                {/* <Col flex={1}><label>记住密码</label></Col> */}
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
        </BackgroundBox>
    </>
}

export { Login };