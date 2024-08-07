import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { useModel } from '@/model';
import { SystemMenu } from '@/schema/system-menu';
import { SettingMenuProp, MenuPath } from './prop';
import { SpiTab } from '../special/wap-info/prop';

/**
 * 系统设置下拉菜单
 */
const SettingMenu: FC<SettingMenuProp> = ({ }) => {

    const navigator = useNavigate();
    const {
        sysMenuData,
        setAlarmDetailModalOpen,
        setQuickCheckReportDetailModalOpen,
        // setSpecialDetailModalOpen,
        querySysMenuData
    } = useModel(state => ({
        sysMenuData: state.sysMenuData,
        setAlarmDetailModalOpen: state.setAlarmDetailModalOpen,
        setQuickCheckReportDetailModalOpen: state.setQuickCheckReportDetailModalOpen,
        // setSpecialDetailModalOpen: state.setSpecialDetailModalOpen,
        querySysMenuData: state.querySysMenuData
    }));

    useEffect(() => {
        querySysMenuData();
    }, []);

    const onMenuItemClick = ({ path }: SystemMenu) => {

        // console.clear();
        // console.log(type, path);
        switch (path) {
            case MenuPath.SpiSearch:
                //专项检查
                navigator(`/special-detail/${SpiTab.All}`);
                break;
            case MenuPath.WarnSearch:
                //预警信息
                navigator('/dashboard');
                setAlarmDetailModalOpen(true);
                break;
            case MenuPath.CheckReport:
                //检查报告
                navigator('/dashboard');
                setQuickCheckReportDetailModalOpen(true);
                break;
            case MenuPath.Devops:
                //设备管理
                navigator('/device');
                break;
            case MenuPath.Area:
                navigator('/zone');
                break;
            case MenuPath.RealTimeSpectrum:
                //实时频谱
                navigator('/real-spectrum');
                break;
            case MenuPath.HistorySpectrum:
                //历史频谱
                navigator('/history-spectrum');
                break;
            case MenuPath.BaseSpectrum:
                //背景频谱
                navigator('/base-spectrum');
                break;
            case MenuPath.Middle:
                //中间件
                navigator('/middleware');
                break;
            case MenuPath.SysMenu:
                //系统菜单
                break;
            case MenuPath.SysRole:
                //角色管理
                break;
            case MenuPath.SysUser:
                //用户管理
                navigator('/sys-user');
                break;
            case MenuPath.SysOperLog:
                //操作日志
                break;
            case MenuPath.SysLoginLog:
                //登录日志
                break;
            case MenuPath.WhiteList:
                //白名单管理
                navigator('/white-list');
                break;
            case MenuPath.FakeHotspot:
                //伪热点防护
                navigator('/fake-hotspot');
                break;
        }
    };

    /**
     * 转为组件菜单数据
     * @param data 菜单数据
     */
    const toMenu = (data: SystemMenu[]): any[] => {
        let menu: any[] = [];;
        //菜单项只取前2层，按sortValue正序排序
        for (let i = 0; i < data.length; i++) {

            if (data[i].children && data[i].children!.length > 0) {
                menu.push({
                    key: `SysMenu_${data[i].component}`,
                    label: <a onClick={() => onMenuItemClick(data[i])}>{data[i].meta.title}</a>,
                    children: toMenu(data[i].children!)
                })
            } else {
                menu.push({
                    key: `SysMenu_${data[i].component}`,
                    label: <a onClick={() => onMenuItemClick(data[i])}>{data[i].meta.title}</a>
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
            size="middle"
            type="primary">
            <MenuOutlined />
            <span>菜单</span>
        </Button>
    </Dropdown>;
};

export { SettingMenu };