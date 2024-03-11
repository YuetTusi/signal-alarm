import electron, { IpcRendererEvent } from 'electron';
import { FC, memo, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useModel } from "@/model";
import { usePhoneAlarm } from '@/hook';
import { AlarmType } from '@/schema/conf';
import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { helper } from '@/utility/helper';
import { instance, closeSse } from '@/utility/sse';
import { StorageKeys } from '@/utility/storage-keys';
import { Bibo } from '@/component/map';
import { RadarInfo } from '@/component/map/radar-info';
import { AlarmInfo } from '@/component/alarm';
import WapInfo from "@/component/special/wap-info";
import {
    WhiteListTop, SpecialTypeChart, AlarmWeekChart, FakeHotspotList
} from '@/component/statis';
import CheckReport from '@/component/check-report';
import { DashboardBox } from "./styled/box";

const { ipcRenderer } = electron;
const { alarmType } = helper.readConf();

/**
 * 主页
 */
const Dashboard: FC<{}> = memo(() => {

    const location = useLocation();

    const {
        phoneAlarmData,
        queryAlarmTop10Data,
        querySpecialTypeStatisData,
        queryAlarmWeekStatisData,
        queryWhiteListTop,
        queryQuickCheckReport,
        setPhoneAlarmData,
        appendPhoneAlarmData,
        updateAlarmBarData,
        clearPhoneAlarmData
    } = useModel(state => ({
        phoneAlarmData: state.phoneAlarmData,
        queryAlarmTop10Data: state.queryAlarmTop10Data,
        querySpecialTypeStatisData: state.querySpecialTypeStatisData,
        queryAlarmWeekStatisData: state.queryAlarmWeekStatisData,
        queryQuickCheckReport: state.queryQuickCheckReport,
        queryWhiteListTop: state.queryWhiteListTop,
        setPhoneAlarmData: state.setPhoneAlarmData,
        appendPhoneAlarmData: state.appendPhoneAlarmData,
        updateAlarmBarData: state.updateAlarmBarData,
        clearPhoneAlarmData: state.clearPhoneAlarmData
    }));

    const alarms = usePhoneAlarm(phoneAlarmData);

    const onMessage = (event: MessageEvent<any>) => {
        // console.log('SSE message:', event?.data);
        try {
            if (typeof event.data === 'string') {
                const data: PhoneAlarmInfo = JSON.parse(event.data);
                const message = JSON.parse(data.message);
                updateAlarmBarData(message['warnReason'], {
                    rssi: message['rssi'] + 100,
                    captureTime: message['captureTime']
                });

                if (data.hash) {
                    appendPhoneAlarmData({
                        ...data,
                        id: helper.nextId(),
                        receiveTime: new Date().getTime()
                    });
                    queryAlarmTop10Data();
                }
            }
        } catch (error) {
            console.log(`Parse JSON Error: ${event.data}`);
        }
    };

    useEffect(() => {
        const hash = sessionStorage.getItem(StorageKeys.MsgKey);
        const userId = sessionStorage.getItem(StorageKeys.UserId);
        if (userId !== null && hash !== null) {
            instance(onMessage);
            // setInterval(() => {
            //     request.post(`/sse/push-user`, {
            //         hash,
            //         userId,
            //         message: JSON.stringify({
            //             rssi: helper.rnd(-90, -50),
            //             captureTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
            //             deviceId: 'zrt-test-x00003',
            //             protocol: '协议7',
            //             protocolType: 7,
            //             status: 0,
            //             warnReason: '电信(2G/3G/4G-B5)'
            //         })
            //     }).then(res => console.log(res))
            //         .catch(err => console.log(err));
            //     request.post(`/sse/push-user`, {
            //         hash,
            //         userId,
            //         message: JSON.stringify({
            //             rssi: helper.rnd(-50, -10),
            //             captureTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
            //             deviceId: 'RS_071',
            //             protocol: '协议6',
            //             protocolType: 6,
            //             status: 0,
            //             warnReason: '联通(3G),联通/电信(4G-B1/N1)'
            //         })
            //     }).then(res => console.log(res))
            //         .catch(err => console.log(err));
            // }, 1000 * 20);
        }
        return () => {
            closeSse();
        };
    }, []);

    /**
     * 每1分钟查询今日专项检查分类统计
     */
    const autoQuerySpecialType = (_: IpcRendererEvent) => {
        querySpecialTypeStatisData();
    };

    /**
     * 清除报警消息
     */
    const alarmClean = (_: IpcRendererEvent) => {
        clearPhoneAlarmData();
    };

    /**
     * 清空所有报警消息
     */
    const alarmDropAll = (_: IpcRendererEvent) => {
        setPhoneAlarmData([]);
        if (location.pathname === '/dashboard') {
            // ipcRenderer.send('reload');
            querySpecialTypeStatisData(); //今日专项检查分类统计
            queryAlarmWeekStatisData(); //近7天告警数量统计
            queryWhiteListTop();//白名单状态
            queryQuickCheckReport();//检查报告
            clearPhoneAlarmData();//清空报警
        }
    };

    useEffect(() => {
        ipcRenderer.on('query-special-type-statis', autoQuerySpecialType);
        return () => {
            ipcRenderer.off('query-special-type-statis', autoQuerySpecialType);
        };
    }, [querySpecialTypeStatisData]);

    useEffect(() => {
        ipcRenderer.on('alarm-clean', alarmClean);
        return () => {
            ipcRenderer.off('alarm-clean', alarmClean);
        };
    }, [alarmClean]);

    useEffect(() => {
        ipcRenderer.on('alarm-drop-all', alarmDropAll);
        return () => {
            ipcRenderer.off('alarm-drop-all', alarmDropAll);
        };
    }, [alarmDropAll]);

    const renderByAlarmType = () => {
        if (alarmType === AlarmType.Single) {
            return <div className="phone-panel">
                <RadarInfo
                    data={alarms} />
            </div>;
        } else {
            return <div className="phone-panel">
                <Bibo />
            </div>;
        }
    };

    return <DashboardBox>
        <div className="left-box">
            {/* <AlarmSiteTopChart /> */}
            <WhiteListTop />
            <SpecialTypeChart />
            <AlarmWeekChart />
            {/* <AlarmTypeChart /> */}
            <FakeHotspotList />
        </div>
        <div className="center-box">
            <div className="main-box">
                <div className="alarm-bg">
                    {renderByAlarmType()}
                </div>
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