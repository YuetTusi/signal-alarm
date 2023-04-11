import localforage from "localforage";
import debounce from 'lodash/debounce';
import { FC, memo, useEffect, MouseEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Empty, Typography, message } from "antd";
import {
    ThunderboltOutlined, LogoutOutlined, InteractionOutlined,
    LoadingOutlined, MobileOutlined
} from '@ant-design/icons';
import useModel from "@/model";
import { instance, close } from '@/utility/sse';
import { StorageKeys } from '@/utility/storage-keys';
import { DisplayPanel } from '@/component/panel';
import WapInfo from "@/component/special/wap-info";
import { SettingMenu } from "@/component/setting-menu";
import { AlarmInfo } from '@/component/alarm';
import {
    AlarmTypeChart, AlarmSiteTopChart, SpecialTypeChart, AlarmWeekChart
} from '@/component/statis';
import CheckReport from '@/component/check-report';
import { SettingMenuAction } from "@/component/setting-menu/prop";
import { DashboardBox } from "./styled/box";
import { request } from "@/utility/http";

const { Text } = Typography;
let sse: EventSource | null = null;

const Dashboard: FC<{}> = memo(() => {
    const navigator = useNavigate();
    const {
        loginUserName,
        logout,
        startTime,
        quickCheckLoading,
        phoneAlarmData,
        quickCheckStart,
        quickCheckStop,
        setPhoneAlarmData
    } = useModel(state => ({
        loginUserName: state.loginUserName,
        logout: state.logout,
        startTime: state.startTime,
        quickCheckLoading: state.quickCheckLoading,
        phoneAlarmData: state.phoneAlarmData,
        quickCheckStart: state.quickCheckStart,
        quickCheckStop: state.quickCheckStop,
        setPhoneAlarmData: state.setPhoneAlarmData
    }));

    const onMessage = (event: MessageEvent<any>) => {
        console.log('SSE message:', event);
        try {
            if (typeof event.data === 'string') {
                const data = JSON.parse(event.data);
                setPhoneAlarmData([data]);
            }
        } catch (error) {
            console.log(`Parse JSON Error: ${event.data}`);
        }
    };

    useEffect(() => {

        const userId = sessionStorage.getItem(StorageKeys.UserId);
        const hash = sessionStorage.getItem(StorageKeys.Hash);

        if (userId !== null && hash !== null) {
            sse = instance(onMessage);
            request.post(`/sse/push-user`, { hash })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }

        return () => {
            close();
            setPhoneAlarmData([]);
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
            close();
            await logout();
            await localforage.clear();
            sessionStorage.clear();
            message.success(`用户${loginUserName}已登出`);
            navigator('/');
        } catch (error) {
            console.warn(error);
        }
    };

    const renderPhoneAlarm = () =>
        phoneAlarmData.map(
            (item, index) => <div className="phone-alarm" key={`PA_${index}`}>
                <div className="icon">
                    <MobileOutlined />
                </div>
                <div className="info">
                    <div>协议名称：{item?.protocolName ?? '-'}</div>
                    <div>设备地址：{item?.siteName ?? '-'}</div>
                </div>
            </div>
        );

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
            <div className="main-box">
                <div className="alarm-bg">
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
                    <div className="phone-panel">
                        {renderPhoneAlarm()}
                    </div>
                </div>
                {/* <DisplayPanel>
                    <div className="caption">
                        无线环境长时检测
                    </div>
                    <div className="content">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                </DisplayPanel> */}
            </div>
            <div className="bottom-box">
                <AlarmInfo />
            </div>
        </div>
        <div className="right-box">
            <WapInfo />
            <CheckReport />
        </div>
    </DashboardBox>
});

export { Dashboard };