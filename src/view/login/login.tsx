import path from 'path';
import electron from 'electron';
import { FC, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined, ReloadOutlined, LoadingOutlined,
    KeyOutlined, SettingOutlined, CheckCircleFilled
} from '@ant-design/icons';
import { App, Col, Row, Input, Button, Form, message } from 'antd';
import { useModel } from "@/model";
import { AppMode } from '@/schema/conf';
import { helper } from '@/utility/helper';
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
// import L from 'leaflet';

const cwd = process.cwd();
const { join } = path;
const { ipcRenderer } = electron;
const { Item, useForm } = Form;
const { Password } = Input;
const ipJson = helper.IS_DEV
    ? join(cwd, './setting/ip.json')
    : join(cwd, 'resources/ip.json');
const { mode } = helper.readConf();

/**
 * 登录页 
 */
const Login: FC<{}> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [networkModalOpen, setNetworkModalOpen] = useState<boolean>(false);
    const { modal } = App.useApp();
    const navigate = useNavigate();
    const [formRef] = useForm<FormValue>();
    const {
        // loginRemember,
        setReading,
        setLoginUserId,
        setLoginUserName,
        setLoginRemember,
        loginByNamePassword,
        queryLoginUserInfo
    } = useModel(state => ({
        // loginRemember: state.loginRemember,
        setReading: state.setReading,
        setLoginUserId: state.setLoginUserId,
        setLoginRemember: state.setLoginRemember,
        setLoginUserName: state.setLoginUserName,
        loginByNamePassword: state.loginByNamePassword,
        queryLoginUserInfo: state.queryLoginUserInfo
    }));

    /**
     * 执行登录
     * @param userName 用户名
     * @param password 口令
     */
    const doLogin = async (userName: string, password: string) => {
        setReading(true);
        try {
            const ret = await loginByNamePassword(userName, password);
            if (ret === null) {
                message.warning('服务请求失败');
                return;
            }
            if (ret.code === 200) {
                //登录成功，令牌写入SessionStorage
                sessionStorage.setItem(StorageKeys.Token, ret.data.token ?? '');
                const res = await queryLoginUserInfo();
                if (res !== null && res.code === 200) {
                    setLoginUserName(res.data.name);
                    setLoginUserId(res.data.userId.toString());
                    const userHash = helper.md5(res.data.userId.toString());
                    const msgKey = helper.md5(res.data.userId.toString() + new Date().getTime());
                    sessionStorage.setItem(StorageKeys.Hash, userHash);
                    sessionStorage.setItem(StorageKeys.User, res.data.name);//用户名
                    sessionStorage.setItem(StorageKeys.UserId, res.data.userId.toString());//用户id
                    sessionStorage.setItem(StorageKeys.MsgKey, msgKey);//消息md5值，用于SSE密钥
                    navigate('/dashboard');
                } else {
                    message.warning(`身份验证失败（${res?.message ?? ''}）`);
                }
            } else {
                message.warning(`身份验证失败（${ret.message}）`);
            }
        } catch (error) {
            console.clear();
            console.warn(error);
            message.warning(`登录失败 ${error.message}`);
        } finally {
            setReading(false);
        }
    };

    useEffect(() => {
        if (mode === AppMode.FullScreen) {
            //如果是全屏模式，使用admin自动登录
            doLogin('admin', '111111');
        }
    }, []);

    /**
     * 登录
     */
    const onLoginSubmit = async (event: MouseEvent) => {
        event.preventDefault();
        message.destroy();
        try {
            const { userName, password } = await formRef.validateFields();
            await doLogin(userName, password);
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

    const renderLogin = () => {
        if (mode === AppMode.FullScreen) {
            return null;
        } else {
            return <LoginOuterBox>
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
                                        block={true}>
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
            </LoginOuterBox>;
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
                {renderLogin()}
            </div>
        </BackgroundBox>
        <NetworkModal
            open={networkModalOpen}
            onCancel={() => setNetworkModalOpen(false)}
            onOk={onNetworkModalOk} />
    </>
}

export { Login };