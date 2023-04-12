import { FC, PropsWithChildren } from 'react';
import Reading from '../reading';
import DragBar from '../drag-bar';
import { SettingMenu } from "../setting-menu";
import { LayoutBox } from './styled/styled';
import { SettingMenuAction } from '../setting-menu/prop';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {

    const onMenuAction = (type: SettingMenuAction) => {
        switch (type) {
            case SettingMenuAction.Device:
                break;
            case SettingMenuAction.Network:
                // setNetworkModalOpen(true);
                break;
            case SettingMenuAction.ModifyPassword:
                // setPasswordModalOpen(true);
                break;
            default:
                console.warn(type);
                break;
        }
    };

    return <LayoutBox>
        <DragBar />
        <Reading />
        <div className="banner">
            <SettingMenu onMenuAction={onMenuAction} />
        </div>
        <div className="context-box">
            {children}
        </div>
    </LayoutBox>
};

export { Layout };