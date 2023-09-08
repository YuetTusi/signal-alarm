import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { useModel } from '@/model';
import { SystemMenu } from '@/schema/system-menu';
import { SettingMenuProp } from './prop';

/**
 * 系统设置下拉菜单
 */
const SettingMenu: FC<SettingMenuProp> = ({ }) => {

    const navigator = useNavigate();
    const {
        sysMenuData,
        setAlarmDetailModalOpen,
        setQuickCheckReportDetailModalOpen,
        setSpecialDetailModalOpen,
        querySysMenuData
    } = useModel(state => ({
        sysMenuData: state.sysMenuData,
        setAlarmDetailModalOpen: state.setAlarmDetailModalOpen,
        setQuickCheckReportDetailModalOpen: state.setQuickCheckReportDetailModalOpen,
        setSpecialDetailModalOpen: state.setSpecialDetailModalOpen,
        querySysMenuData: state.querySysMenuData
    }));

    useEffect(() => {
        querySysMenuData();
    }, []);

    const onMenuItemClick = ({ type, path }: SystemMenu) => {
        // console.clear();
        // console.log(path);
        if (type !== 1) {
            return;
        }
        switch (path) {
            case 'spiSearch':
                setSpecialDetailModalOpen(true);
                break;
            case 'warnSearch':
                setAlarmDetailModalOpen(true);
                break;
            case 'checkReport':
                setQuickCheckReportDetailModalOpen(true);
                break;
            case 'devops':
                navigator('/device');
                break;
        }
    };

    /**
     * 转为组件菜单数据
     * @param data 菜单数据
     */
    const toMenu = (data: SystemMenu[]): any[] => {
        let menu: any[] = [];
        const next = data
            .filter(i => i.type >= 0 && i.type < 2)
            .sort((a, b) => a.sortValue - b.sortValue);
        //菜单项只取前2层，按sortValue正序排序
        for (let i = 0; i < next.length; i++) {

            if (next[i].children && next[i].children.length > 0) {
                menu.push({
                    key: `SysMenu_${next[i].id}`,
                    label: <a onClick={() => onMenuItemClick(next[i])}>{next[i].name}</a>,
                    children: toMenu(next[i].children)
                })
            } else {
                menu.push({
                    key: `SysMenu_${next[i].id}`,
                    label: <a onClick={() => onMenuItemClick(next[i])}>{next[i].name}</a>
                });
            }
        }
        return menu;
    };

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