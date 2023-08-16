import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';
import { FC, PropsWithChildren, MouseEvent } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { App, Button, message } from 'antd';
import { useModel } from '@/model';
import { closeSse } from '@/utility/sse';
import { StorageKeys } from '@/utility/storage-keys';
import Reading from '../reading';
import DragBar from '../drag-bar';
import Voice from '../voice';
import { SettingMenu } from "../setting-menu";
import { LayoutBox } from './styled/styled';
import { SettingMenuAction } from '../setting-menu/prop';

/**
 * 布局页
 */
const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {

    const navigator = useNavigate();
    const { modal } = App.useApp();
    const {
        loginUserName,
        logout,
    } = useModel(state => ({
        loginUserName: state.loginUserName,
        logout: state.logout
    }));

    /**
     * 登出Click
     */
    const onLogoutClick = (event: MouseEvent) => {
        event.preventDefault();
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
     * 菜单项Click
     */
    const onMenuAction = (type: SettingMenuAction) => {
        switch (type) {
            case SettingMenuAction.Device:
                navigator('/device');
                break;
            case SettingMenuAction.Network:
                break;
            case SettingMenuAction.ModifyPassword:
                break;
            default:
                console.warn(type);
                break;
        }
    };

    return <LayoutBox>
        <DragBar />
        <Voice />
        <Reading />
        <div className="banner">
            <div>
                用户: {sessionStorage.getItem(StorageKeys.User) ?? '-'}
            </div>
            <div>
                <SettingMenu onMenuAction={onMenuAction} />
                <Button
                    onClick={onLogoutClick}
                    type="primary"
                    style={{ marginLeft: '5px' }}>
                    <LogoutOutlined />
                    <span>登出</span>
                </Button>
            </div>
        </div>
        <div className="context-box">
            {children}
        </div>
    </LayoutBox>
};

export { Layout };