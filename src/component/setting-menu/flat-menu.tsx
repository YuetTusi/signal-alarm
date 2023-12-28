import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import LeftCircleOutlined from '@ant-design/icons/LeftCircleOutlined';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import { Button, Tabs, TabsProps } from 'antd';
import { useModel } from '@/model';
import { FlatButtons } from './flat-buttons';
import { FlatBox, FlatMenuBox } from './styled/box';
import { FlatMenuProp, FlatProp, MenuPath } from './prop';

const Flat: FC<FlatProp> = ({ children }) => {

    const {
        flatMenuVisible,
        setFlatMenuVisible
    } = useModel(state => ({
        flatMenuVisible: state.flatMenuVisible,
        setFlatMenuVisible: state.setFlatMenuVisible
    }));

    return <FlatBox style={{ display: flatMenuVisible ? 'block' : 'none' }}>
        {/* <Button size="large" type="link" className="back-flat-button">
            <LeftCircleOutlined />
        </Button> */}
        <Button
            onClick={() => setFlatMenuVisible(false)}
            size="large"
            type="link"
            className="close-flat-button">
            <CloseCircleOutlined />
        </Button>
        <div className="menu-inner-box">
            {children}
        </div>
    </FlatBox>
};

/**
 * 单机版菜单
 */
const FlatMenu: FC<FlatMenuProp> = ({ }) => {

    const navigator = useNavigate();
    const {
        setFlatMenuVisible,
        sysMenuData,
        setAlarmDetailModalOpen,
        setQuickCheckReportDetailModalOpen,
        setSpecialDetailModalOpen,
        querySysMenuData
    } = useModel(state => ({
        voiceConrolModalOpen: state.voiceConrolModalOpen,
        sysMenuData: state.sysMenuData,
        setFlatMenuVisible: state.setFlatMenuVisible,
        setAlarmDetailModalOpen: state.setAlarmDetailModalOpen,
        setQuickCheckReportDetailModalOpen: state.setQuickCheckReportDetailModalOpen,
        setSpecialDetailModalOpen: state.setSpecialDetailModalOpen,
        querySysMenuData: state.querySysMenuData
    }));

    const [activeKey, setActiveKey] = useState<string>('');

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
                    menus={item.children}
                    onClick={({ path }) => {
                        switch (path) {
                            case MenuPath.SpiSearch:
                                //专项检查
                                navigator('/dashboard');
                                setSpecialDetailModalOpen(true);
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
                        }
                        setFlatMenuVisible(false);
                    }} />
            };
        });
    };

    return <FlatMenuBox>
        <Button
            onClick={() => setFlatMenuVisible(true)}
            type="primary">
            <MenuOutlined />
            <span>菜单</span>
        </Button>
        <Flat>
            <Tabs
                onChange={(activeKey) => setActiveKey(activeKey)}
                items={bindTabPane()}
                activeKey={activeKey}>
            </Tabs>
        </Flat>
    </FlatMenuBox>;
};

export { FlatMenu };