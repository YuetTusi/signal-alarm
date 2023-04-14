import debounce from 'lodash/debounce';
import { FC, memo, useEffect, MouseEvent } from "react";
import { Button, Typography } from "antd";
import {
    ThunderboltOutlined, LoadingOutlined, MobileOutlined
} from '@ant-design/icons';
import useModel from "@/model";
// import { request } from "@/utility/http";
import { instance, closeSse } from '@/utility/sse';
import { StorageKeys } from '@/utility/storage-keys';
import WapInfo from "@/component/special/wap-info";
import TerminalInfo from "@/component/special/terminal-info";
import HotspotInfo from '@/component/special/hotspot-info';
import { AlarmInfo } from '@/component/alarm';
import {
    AlarmTypeChart, AlarmSiteTopChart, SpecialTypeChart, AlarmWeekChart
} from '@/component/statis';
import CheckReport from '@/component/check-report';
// import { SettingMenuAction } from "@/component/setting-menu/prop";
import { DashboardBox } from "./styled/box";

const { Text } = Typography;
let sse: EventSource | null = null;

const Dashboard: FC<{}> = memo(() => {
    const {
        startTime,
        quickCheckLoading,
        phoneAlarmData,
        quickCheckStart,
        quickCheckStop,
        setPhoneAlarmData
    } = useModel(state => ({
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
                if (data.hash) {
                    setPhoneAlarmData([data]);
                }
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
            // request.post(`/sse/push-user`, { hash })
            //     .then(res => console.log(res))
            //     .catch(err => console.log(err));
        }

        return () => {
            closeSse();
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

    // const onMenuAction = (type: SettingMenuAction) => {
    //     switch (type) {
    //         case SettingMenuAction.Device:
    //             break;
    //         case SettingMenuAction.Network:
    //             break;
    //         case SettingMenuAction.ModifyPassword:
    //             // setPasswordModalOpen(true);
    //             break;
    //         default:
    //             console.warn(type);
    //             break;
    //     }
    // };

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
                    </div>
                    <div className="phone-panel">
                        {renderPhoneAlarm()}
                    </div>
                </div>
            </div>
            <div className="bottom-box">
                <AlarmInfo />
            </div>
        </div>
        <div className="right-box">
            <WapInfo />
            <TerminalInfo />
            <HotspotInfo />
            <CheckReport />
        </div>
    </DashboardBox>
});

export { Dashboard };