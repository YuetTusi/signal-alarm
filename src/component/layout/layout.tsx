import localforage from 'localforage';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, message } from 'antd';
import { useModel } from '@/model';
import { AppMode } from '@/schema/conf';
import { helper } from '@/utility/helper';
import { closeSse } from '@/utility/sse';
import { StorageKeys } from '@/utility/storage-keys';
import Reading from '../reading';
import DragBar from '../drag-bar';
import Voice from '../voice';
import AppTitle from '../app-title';
import { UserMenuAction } from '../setting-menu';
import { SettingMenu, FlatMenu, UserMenu } from "../setting-menu";
import { VoiceControlModal } from '../voice-control-modal';
import { ModifyPasswordModal } from '../modify-password-modal';
import { LayoutBox } from './styled/styled';
import { LayoutProp } from './prop';

const { mode } = helper.readConf();

/**
 * 布局页
 */
const Layout: FC<LayoutProp> = ({ children }) => {

    const navigator = useNavigate();
    const { modal } = App.useApp();
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
            case UserMenuAction.ModifyPassword:
                setModifyPasswordModalOpen(true);
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
                {mode === AppMode.FullScreen ? <FlatMenu /> : <SettingMenu />}
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
            open={voiceControlModalOpen}
            onCancel={() => setVoiceConrolModalOpen(false)}
            onOk={(voice) => {
                message.destroy();
                localStorage.setItem(StorageKeys.Voice, voice ? '1' : '0');
                setSound(voice);
                message.info(`预警声音已${voice ? '打开' : '关闭'}`);
                setVoiceConrolModalOpen(false);
            }} />
        <ModifyPasswordModal
            open={modifyPasswordModalOpen}
            onCancel={() => setModifyPasswordModalOpen(false)}
            onOk={async (oldPassword, newPassword) => {
                await modifyUserPassword(oldPassword, newPassword);
                setModifyPasswordModalOpen(false);
            }}
        />
    </LayoutBox >
};

export { Layout };