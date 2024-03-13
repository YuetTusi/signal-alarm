import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Modal, Tabs } from 'antd';
import { useModel } from '@/model';
import { SpiTab } from '../special/wap-info/prop';
import { FlatButtons } from './flat-buttons';
import { FlatBox } from './styled/box';
import { MenuPath, RouteMenuProp } from './prop';

const RouteMenu: FC<RouteMenuProp> = () => {

    const navigator = useNavigate();
    const [activeKey, setActiveKey] = useState<string>('');
    const {
        routeMenuOpen,
        sysMenuData,
        setRouteMenuOpen,
        // setSpecialDetailModalOpen,
        setAlarmDetailModalOpen,
        setQuickCheckReportDetailModalOpen,
        querySysMenuData
    } = useModel(state => ({
        routeMenuOpen: state.routeMenuOpen,
        sysMenuData: state.sysMenuData,
        setRouteMenuOpen: state.setRouteMenuOpen,
        // setSpecialDetailModalOpen: state.setSpecialDetailModalOpen,
        setAlarmDetailModalOpen: state.setAlarmDetailModalOpen,
        setQuickCheckReportDetailModalOpen: state.setQuickCheckReportDetailModalOpen,
        querySysMenuData: state.querySysMenuData
    }));

    useEffect(() => {
        querySysMenuData();
    }, []);

    useEffect(() => {
        if (sysMenuData.length > 0) {
            setActiveKey(sysMenuData[0].id.toString());
        }
    }, [sysMenuData]);

    const bindTabPane = () => {

        return sysMenuData.map((item) => {
            return {
                key: `${item.id}`,
                label: item.name,
                children: <FlatButtons
                    menus={item
                        .children
                        .sort((a, b) => a.sortValue - b.sortValue)}
                    onClick={({ path }) => {
                        switch (path) {
                            case MenuPath.SpiSearch:
                                //专项检查
                                navigator(`/special-detail/${SpiTab.Signal}`);
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
                            case MenuPath.FakeHotspot:
                                navigator('/fake-hotspot');
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
                        }
                        setRouteMenuOpen(false);
                    }} />
            };
        });
    };

    return <div>
        <Button
            onClick={() => setRouteMenuOpen(true)}
            type="primary">
            <MenuOutlined />
            <span>菜单</span>
        </Button>
        <Modal
            footer={null}
            onCancel={() => setRouteMenuOpen(false)}
            open={routeMenuOpen}
            width={1000}
            centered={true}
            maskClosable={false}
            getContainer="#app">
            <FlatBox>
                <Tabs
                    onChange={(activeKey) => setActiveKey(activeKey)}
                    items={bindTabPane()}
                    activeKey={activeKey}>
                </Tabs>
            </FlatBox>
        </Modal>
    </div>
};

export { RouteMenu };