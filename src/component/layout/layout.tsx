import forage from 'localforage';
import { FC, PropsWithChildren, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { App, Button } from 'antd';
import DragBar from '../drag-bar';
import { useModel } from '@/model';
import Reading from '@/component/reading';
import PasswordModal from '@/component/password-modal';
import { LayoutBox } from './styled/styled';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {

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
            forage.removeItem('token');
            message.success('用户已登出');
            navigator('/');
        } catch (error) {
            console.warn(error);
        }
    };

    return <LayoutBox>
        <DragBar>信号哨兵长时检测系统</DragBar>
        <Reading />
        <div className="setting-box">
            <Button
                onClick={() => setPasswordModalOpen(true)}
                type="link">
                <SettingOutlined />
            </Button>
            <Button
                onClick={onLogoutClick}
                type="link">
                <LogoutOutlined />
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