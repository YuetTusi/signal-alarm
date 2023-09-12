import fs from 'fs';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';
import { FC, PropsWithChildren, MouseEvent } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, message } from 'antd';
import { useModel } from '@/model';
import { closeSse } from '@/utility/sse';
import { StorageKeys } from '@/utility/storage-keys';
import Reading from '../reading';
import DragBar from '../drag-bar';
import Voice from '../voice';
import AppTitle from '../app-title';
import { UserMenuAction } from '../setting-menu';
import { SettingMenu, UserMenu } from "../setting-menu";
import { VoiceControlModal } from '../voice-control-modal';
import { LayoutBox } from './styled/styled';

const { rm } = fs.promises;

/**
 * 布局页
 */
const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {

    const navigator = useNavigate();
    const { modal } = App.useApp();
    const {
        voiceConrolModalOpen,
        loginUserName,
        logout,
        setSound,
        setVoiceConrolModalOpen
    } = useModel(state => ({
        voiceConrolModalOpen: state.voiceConrolModalOpen,
        loginUserName: state.loginUserName,
        logout: state.logout,
        setSound: state.setSound,
        setVoiceConrolModalOpen: state.setVoiceConrolModalOpen
    }));

    /**
     * 登出
     */
    const doLogout = () => {
        modal.confirm({
            onOk: async () => {
                try {
                    closeSse();
                    await logout();
                    await localforage.clear();
                    await rm('C:/_signal_tmp', { recursive: true });
                    sessionStorage.clear();
                    message.success(`用户${loginUserName}已登出`);
                    navigator('/');
                } catch (error) {
                    console.warn(error);
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
            case UserMenuAction.Logout:
                doLogout();
                break;
        }
    };

    return <LayoutBox>
        <DragBar />
        <Voice />
        <Reading />
        <div className="banner">
            <div>
                <SettingMenu />
            </div>
            <div className="app-title">
                <AppTitle />
            </div>
            <div>
                <span>
                    <UserMenu onMenuItemClick={onUserMenuClick} />
                </span>
            </div>
        </div>
        <div className="context-box">
            {children}
        </div>
        <VoiceControlModal
            open={voiceConrolModalOpen}
            onCancel={() => setVoiceConrolModalOpen(false)}
            onOk={(voice) => {
                message.destroy();
                localStorage.setItem(StorageKeys.Voice, voice);
                setSound(voice === '1');
                voice === '1'
                    ? message.info('预警声音已打开')
                    : message.info('预警声音已关闭');
                setVoiceConrolModalOpen(false);
            }} />
    </LayoutBox >
};

export { Layout };