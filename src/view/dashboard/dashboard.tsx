// import dayjs from 'dayjs';
import electron, { IpcRendererEvent } from 'electron';
import { FC, memo, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useModel, useShallow } from "@/model";
import { usePhoneAlarm, useSubscribe } from '@/hook';
import { AlarmType } from '@/schema/conf';
import { Point } from '@/schema/point';
import { helper } from '@/utility/helper';
import { instance, closeSse } from '@/utility/sse';
import { StorageKeys } from '@/utility/storage-keys';
import { Clock } from '@/component/clock';
import { Bibo } from '@/component/map';
import { RadarInfo } from '@/component/map/radar-info';
import { AlarmInfo } from '@/component/alarm';
import WapInfo from "@/component/special/wap-info";
import {
    SpecialTypeChart, FakeHotspotList, SignalList
} from '@/component/statis';
import CheckReport from '@/component/check-report';
import { DashboardBox } from "./styled/box";
import { PushMessage, SSEMessageType } from '@/schema/push-message';
// import { request } from '@/utility/http';
// import { Protocol } from '@/schema/protocol';

const { ipcRenderer } = electron;
const { alarmType } = helper.readConf();

/**
 * 主页 
 */
const Dashboard: FC<{}> = memo(() => {

    const location = useLocation();

    const {
        phoneAlarmData,
        querySpecialTypeStatisData,
        queryAlarmWeekStatisData,
        queryWhiteListTop,
        queryQuickCheckReport,
        setPhoneAlarmData,
        appendPhoneAlarmData,
        updateAlarmBarData,
        clearPhoneAlarmData,
        appendPoint,
        querySignalTop,
        queryFakeHotspotList
    } = useModel(useShallow((state) => ({
        phoneAlarmData: state.phoneAlarmData,
        querySpecialTypeStatisData: state.querySpecialTypeStatisData,
        queryAlarmWeekStatisData: state.queryAlarmWeekStatisData,
        queryQuickCheckReport: state.queryQuickCheckReport,
        queryWhiteListTop: state.queryWhiteListTop,
        setPhoneAlarmData: state.setPhoneAlarmData,
        appendPhoneAlarmData: state.appendPhoneAlarmData,
        updateAlarmBarData: state.updateAlarmBarData,
        clearPhoneAlarmData: state.clearPhoneAlarmData,
        appendPoint: state.appendPoint,
        querySignalTop: state.querySignalTop,
        queryFakeHotspotList: state.queryFakeHotspotList
    })));

    const alarms = usePhoneAlarm(phoneAlarmData);

    const onMessage = (event: MessageEvent<string>) => {
        // console.log('SSE message:', event.data);
        try {
            const m: PushMessage = JSON.parse(event.data);
            switch (m.type) {
                case SSEMessageType.Alarm:
                    //告警数据
                    const message = JSON.parse(m.message);
                    updateAlarmBarData(message['warnReason'], {
                        rssi: message['rssi'] + 100,
                        captureTime: message['captureTime']
                    });

                    if (m.hash) {
                        appendPhoneAlarmData({
                            ...m,
                            id: helper.nextId(),
                            receiveTime: new Date().getTime()
                        });
                    }
                    break;
                case SSEMessageType.Location:
                    //多点定位数据
                    const nextPoint = JSON.parse(m.message) as Point;
                    nextPoint.actionTime = new Date().getTime();
                    appendPoint(nextPoint);
                    console.log(nextPoint);
                    break;
                default:
                    // console.clear();
                    // console.log(`未知SSE Message Type:${m.type}`);
                    break;
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
            // setTimeout(() => {
            //     //# mock数据 
            //     const m1: PushMessage = {
            //         type: SSEMessageType.Location,
            //         message: JSON.stringify({
            //             content: "A1:B1:5A:75:4E:21",
            //             lat: "0.0000938773155255597",
            //             lon: "0.00004459172487258912",
            //             areaId: 1921003522,
            //             protocolType: 8,
            //             x: 4.642381602965856,
            //             y: 6.746058133752188,
            //             actionTime: new Date().getTime()
            //         }),
            //         userId: sessionStorage.getItem(StorageKeys.MsgKey)!,
            //         hash: sessionStorage.getItem(StorageKeys.UserId)!,
            //     };
            //     const m2: PushMessage = {
            //         type: SSEMessageType.Location,
            //         message: JSON.stringify({
            //             content: "A1:B1:5A:75:4E:21",
            //             lat: "0.00023569911719066813",
            //             lon: "0.00010728836059570314",
            //             areaId: 1921003522,
            //             protocolType: 14,
            //             x: 4.642381602965856,
            //             y: 6.746058133752188,
            //             actionTime: new Date().getTime()
            //         }),
            //         userId: sessionStorage.getItem(StorageKeys.MsgKey)!,
            //         hash: sessionStorage.getItem(StorageKeys.UserId)!,
            //     };
            //     const m3: PushMessage = {
            //         type: SSEMessageType.Location,
            //         message: JSON.stringify({
            //             content: "A1:B1:5A:75:4E:21",
            //             lat: "0.000053308904178668025",
            //             lon: "0.000268891453742981",
            //             areaId: 1921003522,
            //             protocolType: 9,
            //             x: 4.642381602965856,
            //             y: 6.746058133752188,
            //             actionTime: new Date().getTime()
            //         }),
            //         userId: sessionStorage.getItem(StorageKeys.MsgKey)!,
            //         hash: sessionStorage.getItem(StorageKeys.UserId)!,
            //     };
            //     const nextPoint1 = JSON.parse(m1.message) as Point;
            //     nextPoint1.actionTime = new Date().getTime();
            //     const nextPoint2 = JSON.parse(m2.message) as Point;
            //     nextPoint2.actionTime = new Date().getTime();
            //     const nextPoint3 = JSON.parse(m3.message) as Point;
            //     nextPoint2.actionTime = new Date().getTime();
            //     appendPoint(nextPoint1);
            //     appendPoint(nextPoint2);
            //     appendPoint(nextPoint3);
            // request.post(`/sse/push-user`, {
            //     hash,
            //     userId,
            //     type: SSEMessageType.Alarm,
            //     message: JSON.stringify({
            //         rssi: helper.rnd(-90, -50),
            //         captureTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
            //         deviceId: 'zrt-test-x00003',
            //         protocol: '协议7',
            //         protocolType: 7,
            //         status: 0,
            //         warnReason: '电信(2G/3G/4G-B5)'
            //     })
            // }).then(res => console.log(res));
            // request.post(`/sse/push-user`, {
            //     hash,
            //     userId,
            //     type: SSEMessageType.Alarm,
            //     message: '{"cmd_time":1709621749,"cmd_type":"freq_report","dev_id":"zrt-test-x00008","cmd_info":{"freq_info":[{"freq":1886,"time":1709621749,"signal":"-60"}]}}'
            // }).then(res => console.log(res))
            //     .catch(err => console.log(err));
            // }, 1000 * 6);
        }
        return () => {
            closeSse();
        };
    }, []);

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
        console.clear();
    };

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

    useSubscribe('query-each-10', () => querySignalTop());

    useSubscribe('query-each-15', () => querySpecialTypeStatisData());

    useSubscribe('query-each-20', () => queryFakeHotspotList());

    /**
     * 据配置文件显示雷达图或地图
     */
    const renderByAlarmType = () => alarmType === AlarmType.Single
        ? <div className="phone-panel">
            <RadarInfo
                open={true}
                data={alarms} />
        </div>
        : <div className="phone-panel">
            <Bibo />
        </div>;

    return <DashboardBox>
        <div className="left-box">
            <SignalList />
            {/* <AlarmSiteTopChart /> */}
            {/* <WhiteListTop /> */}
            <SpecialTypeChart />
            {/* <AlarmWeekChart /> */}
            {/* <AlarmTypeChart /> */}
            <FakeHotspotList />
            <CheckReport />
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
            <Clock />
            <WapInfo />
        </div>
    </DashboardBox>
});

export { Dashboard };