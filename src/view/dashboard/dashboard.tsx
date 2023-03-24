import { FC, memo, useEffect, MouseEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, message } from "antd";
import { ThunderboltOutlined, LogoutOutlined, InteractionOutlined } from '@ant-design/icons';
import WapInfo from "@/component/special/wap-info";
import { SettingMenu } from "@/component/setting-menu";
import { AlarmInfo } from '@/component/alarm';
import {
    AlarmTypeChart, AlarmSiteTopChart, SpecialTypeChart, AlarmWeekChart
} from '@/component/statis';
import { DashboardBox } from "./styled/box";
import { instance, News } from "@/utility/news";
import { StorageKeys } from "@/utility/storage-keys";
import useModel from "@/model";
import localforage from "localforage";
import { SettingMenuAction } from "@/component/setting-menu/prop";

let sse: News;

const Dashboard: FC<{}> = memo(() => {
    const navigator = useNavigate();
    const {
        logout
    } = useModel(state => ({
        logout: state.logout
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

    const onLogoutClick = async (event: MouseEvent) => {
        event.preventDefault();
        try {
            await instance().close();
            await logout();
            await localforage.clear();
            sessionStorage.clear();
            message.success('用户已登出');
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
            </div>
            <div className="main-box">
                <div>
                    main-box
                </div>
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