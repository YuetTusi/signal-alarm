import { FC } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { SettingMenuAction, SettingMenuProp } from './prop';

/**
 * 系统设置下拉菜单
 */
const SettingMenu: FC<SettingMenuProp> = ({ onMenuAction }) => <Dropdown
    menu={{
        items: [
            {
                key: 'SM_0',
                label: <a onClick={() => onMenuAction(SettingMenuAction.Device)}>设备管理</a>
            },
            {
                key: 'SM_1',
                label: <a onClick={() => onMenuAction(SettingMenuAction.Network)}>IP设置</a>
            },
            {
                key: 'SM_2',
                label: <a onClick={() => onMenuAction(SettingMenuAction.ModifyPassword)}>修改密码</a>
            }
        ]
    }}
    trigger={['click']}>
    <Button
        type="primary">
        <SettingOutlined />
        <span>系统设置</span>
    </Button>
</Dropdown>;

export { SettingMenu };