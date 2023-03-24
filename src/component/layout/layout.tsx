import { FC, PropsWithChildren } from 'react';
import DragBar from '../drag-bar';
import Reading from '@/component/reading';
import { LayoutBox } from './styled/styled';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {


    // const onLogoutClick = async (event: MouseEvent) => {
    //     event.preventDefault();
    //     try {
    //         await instance().close();
    //         await logout();
    //         await localforage.clear();
    //         sessionStorage.clear();
    //         message.success('用户已登出');
    //         navigator('/');
    //     } catch (error) {
    //         console.warn(error);
    //     }
    // };

    // const onMenuAction = (type: SettingMenuAction) => {
    //     switch (type) {
    //         case SettingMenuAction.Sensitivity:
    //         case SettingMenuAction.Camera:
    //         case SettingMenuAction.Network:
    //             break;
    //         case SettingMenuAction.ModifyPassword:
    //             setPasswordModalOpen(true);
    //             break;
    //         default:
    //             console.warn(type);
    //             break;
    //     }
    // };

    return <LayoutBox>
        <DragBar></DragBar>
        <Reading />
        {/* <div className="setting-box">
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
                <span>安全登出</span>
            </Button>
        </div> */}
        <div className="context-box">
            {children}
        </div>
    </LayoutBox>
};

export { Layout };