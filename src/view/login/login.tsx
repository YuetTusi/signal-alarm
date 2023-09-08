import path from 'path';
import electron from 'electron';
import localforage from 'localforage';
import { FC, MouseEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined, ReloadOutlined, LoadingOutlined,
    KeyOutlined, SettingOutlined, CheckCircleFilled
} from '@ant-design/icons';
import { Col, Row, Input, Button, Form, message, App } from 'antd';
import { useModel } from "@/model";
import { useUnmount } from '@/hook';
import { APP_NAME, helper } from '@/utility/helper';
import { StorageKeys } from '@/utility/storage-keys';
import DragBar from '@/component/drag-bar';
import Reading from '@/component/reading';
import NetworkModal from '@/component/network-modal';
import { AppTitle } from '@/component/app-title';
import {
    BackgroundBox, LoginBox, LoginOuterBox
} from "./styled/styled";
import { FormValue } from "./prop";
// import { log } from '@/utility/log';

const cwd = process.cwd();
const { join } = path;
const { ipcRenderer } = electron;
const { Item, useForm } = Form;
const { Password } = Input;
const ipJson = helper.IS_DEV
    ? join(cwd, './ip.json')
    : join(cwd, 'resources/ip.json');

const Login: FC<{}> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [networkModalOpen, setNetworkModalOpen] = useState<boolean>(false);
    const { modal } = App.useApp();
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

    useUnmount(() => console.clear());

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
                sessionStorage.setItem(StorageKeys.Token, ret.data.token ?? '');
                const res = await queryLoginUserInfo();
                if (res !== null && res.code === 200) {
                    setLoginUserName(res.data.name);
                    setLoginUserId(res.data.userId.toString());
                    const userHash = helper.md5(res.data.userId.toString());
                    const msgKey = helper.md5(res.data.userId.toString() + new Date().getTime());
                    sessionStorage.setItem(StorageKeys.Hash, userHash);
                    sessionStorage.setItem(StorageKeys.User, res.data.name);
                    sessionStorage.setItem(StorageKeys.UserId, res.data.userId.toString());
                    sessionStorage.setItem(StorageKeys.MsgKey, msgKey);
                    if (loginRemember) {
                        //如果记住登录状态，将token写入localStorage
                        localforage.setItem(StorageKeys.Token, ret.data.token ?? '');
                        localforage.setItem(StorageKeys.Hash, userHash);
                        localforage.setItem(StorageKeys.User, res.data.name);
                        localforage.setItem(StorageKeys.UserId, res.data.userId.toString());
                        sessionStorage.setItem(StorageKeys.MsgKey, msgKey);
                    }
                    message.success('登录成功');
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

    const onNetworkModalOk = async (appName: string, ip: string, port: number) => {
        try {
            const success = await helper.writeJson(ipJson, { appName, ip, port });
            if (success) {
                setNetworkModalOpen(false);
                modal.confirm({
                    onOk() {
                        ipcRenderer.send('do-relaunch');
                    },
                    icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
                    title: '成功',
                    content: '应用配置更新成功，请重启生效新配置',
                    okText: '重启',
                    cancelText: '取消',
                    centered: true
                });
            } else {
                modal.warning({
                    title: '失败',
                    content: '更新失败',
                    okText: '确定'
                });
            }
        } catch (error) {
            modal.warning({
                title: '失败',
                content: `应用配置更新失败(${error.message})`,
                okText: '确定'
            });
        }
    };

    return <>
        <DragBar />
        <Reading />
        <BackgroundBox>
            <div className="setting-box">
                <Button
                    onClick={() => setNetworkModalOpen(true)}
                    type="link"
                    title="应用设置">
                    <SettingOutlined />
                </Button>
            </div>
            <div className="app-title-box">
                <AppTitle />
            </div>
            <div className="login-body-box">
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
                                <Input prefix={<UserOutlined style={{ color: '#424242' }} />} />
                            </Item>
                            <Item
                                rules={[{
                                    required: true,
                                    message: '请填写密码'
                                }]}
                                name="password"
                                label="密码">
                                <Password prefix={<KeyOutlined style={{ color: '#424242' }} />} />
                            </Item>
                            {/* <Item>
                            <Row gutter={16}>
                                <Col flex="none">
                                    <Checkbox
                                        onChange={(event) => setLoginRemember(event.target.checked)}
                                        checked={loginRemember}
                                        style={{ verticalAlign: 'text-top' }} >
                                        <label onClick={() => setLoginRemember(!loginRemember)}>记住密码</label>
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Item> */}
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
                                                // log.info('这是一个测试');
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
            </div>
        </BackgroundBox>
        <NetworkModal
            open={networkModalOpen}
            onCancel={() => setNetworkModalOpen(false)}
            onOk={onNetworkModalOk} />
    </>
}

export { Login };