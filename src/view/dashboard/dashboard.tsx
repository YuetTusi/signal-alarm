import localforage from "localforage";
import debounce from 'lodash/debounce';
import { FC, memo, useEffect, MouseEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Empty, Typography, message } from "antd";
import {
    ThunderboltOutlined, LogoutOutlined, InteractionOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import useModel from "@/model";
import { instance, News } from "@/utility/news";
import { StorageKeys } from "@/utility/storage-keys";
import { DisplayPanel } from '@/component/panel';
import WapInfo from "@/component/special/wap-info";
import { SettingMenu } from "@/component/setting-menu";
import { AlarmInfo } from '@/component/alarm';
import {
    AlarmTypeChart, AlarmSiteTopChart, SpecialTypeChart, AlarmWeekChart
} from '@/component/statis';
import { SettingMenuAction } from "@/component/setting-menu/prop";
import { DashboardBox } from "./styled/box";

let sse: News;
const { Text } = Typography;

const Dashboard: FC<{}> = memo(() => {
    const navigator = useNavigate();
    const {
        loginUserName,
        logout,
        startTime,
        quickCheckLoading,
        quickCheckStart,
        quickCheckStop
    } = useModel(state => ({
        loginUserName: state.loginUserName,
        logout: state.logout,
        startTime: state.startTime,
        quickCheckLoading: state.quickCheckLoading,
        quickCheckStart: state.quickCheckStart,
        quickCheckStop: state.quickCheckStop
    }));

    useEffect(() => {

        const user = sessionStorage.getItem(StorageKeys.User);
        const userId = sessionStorage.getItem(StorageKeys.UserId);
        const hash = sessionStorage.getItem(StorageKeys.Hash);
        if (user !== null && userId !== null && hash !== null) {
            sse = instance();
            sse.on('open', () => console.log('SSE is opening'));
            sse.on('message', (event, data) => {
                console.log(event);
                console.log(data);
            });
            sse.on('close', (info) => console.log(info));
        }
    }, []);

    const onCheckClick = debounce(async (event: MouseEvent) => {
        event.preventDefault();
        try {
            if (startTime === '') {
                //开始
                await quickCheckStart();
            } else {
                //停止
                await quickCheckStop();
            }
        } catch (error) {
            console.warn(error);
        }
    }, 1000, { leading: true, trailing: false });

    const onLogoutClick = async (event: MouseEvent) => {
        event.preventDefault();
        try {
            await instance().close();
            await logout();
            await localforage.clear();
            sessionStorage.clear();
            message.success(`用户${loginUserName}已登出`);
            navigator('/');
        } catch (error) {
            console.warn(error);
        }
    };

    const onMenuAction = (type: SettingMenuAction) => {
        switch (type) {
            case SettingMenuAction.Sensitivity:
            case SettingMenuAction.Camera:
            case SettingMenuAction.Network:
                break;
            case SettingMenuAction.ModifyPassword:
                // setPasswordModalOpen(true);
                break;
            default:
                console.warn(type);
                break;
        }
    };

    return <DashboardBox>
        <div className="left-box">
            <AlarmSiteTopChart />
            <AlarmTypeChart />
            <AlarmWeekChart />
            <SpecialTypeChart />
        </div>
        <div className="center-box">
            <div className="setting-box">

                {/* <Button
                    onClick={() => {
                        sse.pushUser();
                    }}
                    type="link">
                    测试
                </Button> */}
                <Text style={{ fontSize: '12px' }} type="success">
                    {startTime === '' ? '' : `开始时间：${startTime}`}
                </Text>
                <Button
                    onClick={onCheckClick}
                    disabled={quickCheckLoading}
                    type="primary">
                    {quickCheckLoading ? <LoadingOutlined /> : <ThunderboltOutlined />}
                    <span>{startTime === '' ? '快速检测' : '停止快速检测'}</span>
                </Button>
                {/* <Button
                    onClick={() => { }}
                    disabled={quickCheckLoading}
                    type="primary">
                    <InteractionOutlined />
                    <span>恢复出厂</span>
                </Button>
                <SettingMenu onMenuAction={onMenuAction} /> */}
                <span style={{ textAlign: 'center', padding: "0 5px", color: '#5e5e5e' }}>|</span>
                <Button
                    onClick={onLogoutClick}
                    type="primary">
                    <LogoutOutlined />
                    <span>{`登出${loginUserName}`}</span>
                </Button>
            </div>
            <div className="main-box">
                <DisplayPanel>
                    <div className="caption">
                        无线环境长时检测
                    </div>
                    <div className="content">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                </DisplayPanel>
            </div>
            <div className="bottom-box">
                <AlarmInfo />
            </div>
        </div>
        <div className="right-box">
            <WapInfo />
        </div>
    </DashboardBox>
});

export { Dashboard };