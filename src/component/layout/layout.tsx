import path from 'path';
import electron from 'electron';
import localforage from 'localforage';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import { App, Button, message } from 'antd';
import { useModel } from '@/model';
import { AlarmType, AppMode } from '@/schema/conf';
import { helper } from '@/utility/helper';
import { closeSse } from '@/utility/sse';
import { StorageKeys } from '@/utility/storage-keys';
import { Auth } from '@/component/auth';
import NetworkModal from '@/component/network-modal';
import Reading from '../reading';
import DragBar from '../drag-bar';
import Voice from '../voice';
import AppTitle from '../app-title';
import { UserMenuAction } from '../setting-menu';
import { RouteMenu, UserMenu } from "../setting-menu";
import { VoiceControlModal } from '../voice-control-modal';
import { ModifyPasswordModal } from '../modify-password-modal';
import { LayoutBox } from './styled/styled';
import { LayoutProp } from './prop';
import { FormValue } from '../network-modal/prop';

const { join } = path;
const { ipcRenderer } = electron;
const cwd = process.cwd();
const ipJson = helper.IS_DEV
    ? join(cwd, './setting/ip.json')
    : join(cwd, 'resources/ip.json');
const confJson = helper.IS_DEV
    ? join(cwd, './setting/conf.json')
    : join(cwd, 'resources/conf.json');
const { mode } = helper.readConf();

/**
 * 布局
 */
const Layout: FC<LayoutProp> = ({ children }) => {

    const navigator = useNavigate();
    const { modal } = App.useApp();
    const [networkModalOpen, setNetworkModalOpen] = useState<boolean>(false);
    const {
        voiceControlModalOpen,
        modifyPasswordModalOpen,
        loginUserName,
        logout,
        setSound,
        setModifyPasswordModalOpen,
        setVoiceConrolModalOpen,
        modifyUserPassword
    } = useModel(state => ({
        voiceControlModalOpen: state.voiceControlModalOpen,
        modifyPasswordModalOpen: state.modifyPasswordModalOpen,
        loginUserName: state.loginUserName,
        logout: state.logout,
        setSound: state.setSound,
        setModifyPasswordModalOpen: state.setModifyPasswordModalOpen,
        setVoiceConrolModalOpen: state.setVoiceConrolModalOpen,
        modifyUserPassword: state.modifyUserPassword
    }));

    useEffect(() => {
        const voice = localStorage.getItem(StorageKeys.Voice);
        if (voice === '1') {
            setSound(true);
        }
    }, []);

    /**
     * 登出
     */
    const doLogout = () => {
        modal.confirm({
            async onOk() {
                try {
                    closeSse();
                    await logout();
                    await localforage.clear();
                } catch (error) {
                    console.warn(error);
                } finally {
                    sessionStorage.clear();
                    message.success(`用户${loginUserName}已登出`);
                    navigator('/');
                }
            },
            centered: true,
            cancelText: '否',
            okText: '是',
            content: '确认登出系统？',
            title: '登出'
        });
    };

    /**
     * 用户菜单项Click
     * @param action 点击枚举值
     */
    const onUserMenuClick = (action: UserMenuAction) => {
        switch (action) {
            case UserMenuAction.VoiceSwitch:
                setVoiceConrolModalOpen(true);
                break;
            case UserMenuAction.ModifyPassword:
                setModifyPasswordModalOpen(true);
                break;
            case UserMenuAction.Logout:
                doLogout();
                break;
        }
    };

    const onNetworkModalOk = async (values: FormValue) => {
        try {

            const prevConf = await helper.readJson(confJson);

            const [ipSuccess, confSuccess] = await Promise.all([
                // helper.writeJson(ipJson, {
                //     appName: values.appName,
                //     ip: values.ip,
                //     port: values.port
                // }),
                Promise.resolve(true),
                helper.writeJson(confJson, {
                    ...prevConf,
                    mode: values.mode,
                    alarmType: values.mode === AppMode.PC ? AlarmType.Multi : AlarmType.Single
                })
            ]);
            if (ipSuccess && confSuccess) {
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

    return <LayoutBox>
        <DragBar />
        <Voice />
        <Reading />
        <div className="banner">
            <div>
                <RouteMenu />
            </div>
            <div className="app-title">
                <AppTitle />
            </div>
            <div>
                <Auth deny={mode === AppMode.PC}>
                    <span>
                        <Button
                            onClick={() => setNetworkModalOpen(true)}
                            className="web-setting"
                            type="link"
                            size="large">
                            <SettingOutlined />
                            <span>设置</span>
                        </Button>
                    </span>
                </Auth>
                <span>
                    <UserMenu onMenuItemClick={onUserMenuClick} />
                </span>
            </div>
        </div>
        <div className="context-box">
            {children}
        </div>
        <VoiceControlModal
            open={voiceControlModalOpen}
            onCancel={() => setVoiceConrolModalOpen(false)}
            onOk={(voice) => {
                message.destroy();
                localStorage.setItem(StorageKeys.Voice, voice ? '1' : '0');
                setVoiceConrolModalOpen(false);
                message.info(`预警声音已${voice ? '打开' : '关闭'}`);
                setSound(voice);
            }} />
        <ModifyPasswordModal
            open={modifyPasswordModalOpen}
            onCancel={() => setModifyPasswordModalOpen(false)}
            onOk={async (oldPassword, newPassword) => {
                await modifyUserPassword(oldPassword, newPassword);
                setModifyPasswordModalOpen(false);
            }}
        />
        <NetworkModal
            open={networkModalOpen}
            onCancel={() => setNetworkModalOpen(false)}
            onOk={onNetworkModalOk} />
    </LayoutBox >
};

export { Layout };