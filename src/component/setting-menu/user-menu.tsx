import { FC, MouseEvent } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { StorageKeys } from '@/utility/storage-keys';
import { UserMenuAction, UserMenuProp } from './prop';
import { UserIconBox } from './styled/box';


/**
 * 用户下拉菜单
 */
const UserMenu: FC<UserMenuProp> = ({ onMenuItemClick }) => {

    return <Dropdown
        menu={{
            items: [{
                key: 'UMI_VoiceSwitch',
                label: <a
                    onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                        event.preventDefault();
                        onMenuItemClick(UserMenuAction.VoiceSwitch);
                    }}>
                    预警声音开关
                </a>
            }, {
                key: 'UMI_ModifyPassword',
                label: <a
                    onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                        event.preventDefault();
                        onMenuItemClick(UserMenuAction.ModifyPassword);
                    }}>
                    修改密码
                </a>
            }, {
                key: 'UMI_Logout',
                label: <a
                    onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                        event.preventDefault();
                        onMenuItemClick(UserMenuAction.Logout);
                    }}>
                    登出系统
                </a>
            }]
        }}
        arrow={true}>
        <UserIconBox>
            <UserOutlined />
            <span className="u-name">{sessionStorage.getItem(StorageKeys.User) ?? '-'}</span>
        </UserIconBox>

    </Dropdown>
};

export { UserMenu };