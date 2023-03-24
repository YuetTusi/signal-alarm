import { FC, PropsWithChildren, useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThunderboltOutlined, LogoutOutlined, InteractionOutlined } from '@ant-design/icons';
import { App, Button } from 'antd';
import DragBar from '../drag-bar';
import { useModel } from '@/model';
import { instance, News } from '@/utility/news';
import Reading from '@/component/reading';
import PasswordModal from '@/component/password-modal';
import { LayoutBox } from './styled/styled';
import { SettingMenu } from '../setting-menu';
import { SettingMenuAction } from '../setting-menu/prop';

let sse: News;

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {

    useEffect(() => {

        const user = sessionStorage.getItem('user');
        const hash = sessionStorage.getItem('sh');
        if (user !== null && hash !== null) {
            sse = instance();
            sse.on('open', () => {
                console.log('sse open');
                sse.pushUser();
            });
            sse.on('message', (event, data) => {
                console.log(event);
                console.log(data);
            });
            sse.on('close', (info) => console.log(info));
        }
    }, []);

    const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
    const navigator = useNavigate();
    const { message } = App.useApp();
    const {
        logout
    } = useModel(state => ({
        logout: state.logout
    }));

    const onPasswordModalCancel = () => setPasswordModalOpen(false);

    const onPasswordModalOk = (newPassword: string) => {
        console.log(newPassword);
    };

    const onLogoutClick = async (event: MouseEvent) => {
        event.preventDefault();
        try {
            await logout();
            await instance().close();
            sessionStorage.clear();
            message.success('用户已登出');
            navigator('/');
        } catch (error) {
            console.warn(error);
        }
    };

    const onMenuAction = (type: SettingMenuAction) => {
        switch (type) {
            case SettingMenuAction.Sensitivity:
            case SettingMenuAction.Camera:
            case SettingMenuAction.Network:
                break;
            case SettingMenuAction.ModifyPassword:
                setPasswordModalOpen(true);
                break;
            default:
                console.warn(type);
                break;
        }
    };

    return <LayoutBox>
        <DragBar>信号哨兵长时检测系统</DragBar>
        <Reading />
        <div className="setting-box">
            <Button
                onClick={() => {
                    sse.pushUser();
                }}
                type="link">
                测试
            </Button>
            <Button
                onClick={() => { }}
                type="primary">
                <ThunderboltOutlined />
                <span>快速检测</span>
            </Button>
            <Button
                onClick={() => { }}
                type="primary">
                <InteractionOutlined />
                <span>恢复出厂</span>
            </Button>
            <SettingMenu onMenuAction={onMenuAction} />
            <span style={{ textAlign: 'center', padding: "0 5px", color: '#5e5e5e' }}>|</span>
            <Button
                onClick={onLogoutClick}
                type="primary">
                <LogoutOutlined />
                <span>登出</span>
            </Button>
        </div>
        <div className="context-box">
            {children}
        </div>
        <PasswordModal
            open={passwordModalOpen}
            onCancel={onPasswordModalCancel}
            onOk={onPasswordModalOk} />
    </LayoutBox>
};

export { Layout };