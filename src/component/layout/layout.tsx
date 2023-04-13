import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';
import { FC, PropsWithChildren, MouseEvent } from 'react';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useModel } from '@/model';
import { closeSse } from '@/utility/sse';
import Reading from '../reading';
import DragBar from '../drag-bar';
// import { SettingMenu } from "../setting-menu";
import { LayoutBox } from './styled/styled';
import { SettingMenuAction } from '../setting-menu/prop';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {

    const navigator = useNavigate();
    const {
        loginUserName,
        logout,
    } = useModel(state => ({
        loginUserName: state.loginUserName,
        logout: state.logout
    }));

    const onLogoutClick = async (event: MouseEvent) => {
        event.preventDefault();
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
    };

    // const onMenuAction = (type: SettingMenuAction) => {
    //     switch (type) {
    //         case SettingMenuAction.Device:
    //             break;
    //         case SettingMenuAction.Network:
    //             break;
    //         case SettingMenuAction.ModifyPassword:
    //             break;
    //         default:
    //             console.warn(type);
    //             break;
    //     }
    // };

    return <LayoutBox>
        <DragBar />
        <Reading />
        <div className="banner">
            <Button
                onClick={() => navigator('/device')}
                type="primary">
                <SettingOutlined />
                <span>设备管理</span>
            </Button>
            <Button
                onClick={onLogoutClick}
                type="primary">
                <LogoutOutlined />
                <span>登出</span>
            </Button>
            {/* <SettingMenu onMenuAction={onMenuAction} /> */}
        </div>
        <div className="context-box">
            {children}
        </div>
    </LayoutBox>
};

export { Layout };