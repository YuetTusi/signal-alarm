import { FC, useEffect } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { useModel } from '@/model';
import { SystemMenu } from '@/schema/system-menu';
import { SettingMenuAction, SettingMenuProp } from './prop';

/**
 * 转为组件菜单数据
 * @param data 菜单数据
 */
const toMenu = (data: SystemMenu[]): any[] => {
    let menu: any[] = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length > 0) {
            menu.push({
                key: `SysMenu_${data[i].id}`,
                label: data[i].name,
                children: toMenu(data[i].children)
            })
        } else {
            menu.push({
                key: `SysMenu_${data[i].id}`,
                label: data[i].name
            });
        }
    }
    return menu;
};

/**
 * 系统设置下拉菜单
 */
const SettingMenu: FC<SettingMenuProp> = ({ onMenuAction }) => {

    const {
        sysMenuData,
        querySysMenuData
    } = useModel(state => ({
        sysMenuData: state.sysMenuData,
        querySysMenuData: state.querySysMenuData
    }));

    useEffect(() => {
        querySysMenuData();
    }, []);

    return <Dropdown
        menu={{
            items: toMenu(sysMenuData)
        }}
        trigger={['click']}>
        <Button
            type="primary">
            <MenuOutlined />
            <span>菜单</span>
        </Button>
    </Dropdown>;
};

export { SettingMenu };