import electron, { IpcRendererEvent } from 'electron';
import { FC, memo, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useModel } from "@/model";
import { helper } from '@/utility/helper';
import { instance, closeSse } from '@/utility/sse';
import { StorageKeys } from '@/utility/storage-keys';
import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { Bibo } from '@/component/map';
import WapInfo from "@/component/special/wap-info";
import { AlarmInfo } from '@/component/alarm';
import { RadarInfo } from '@/component/map/radar-info';
import {
    AlarmTypeChart, WhiteListTop, SpecialTypeChart, AlarmWeekChart
} from '@/component/statis';
import CheckReport from '@/component/check-report';
import { DashboardBox } from "./styled/box";
import { request } from '@/utility/http';
import { AlarmType } from '@/schema/conf';

const { ipcRenderer } = electron;
const { alarmType } = helper.readConf();

/**
 * 主页
 */
const Dashboard: FC<{}> = memo(() => {

    const location = useLocation();

    const {
        queryAlarmTop10Data,
        querySpecialTypeStatisData,
        setPhoneAlarmData,
        appendPhoneAlarmData,
        clearPhoneAlarmData
    } = useModel(state => ({
        queryAlarmTop10Data: state.queryAlarmTop10Data,
        querySpecialTypeStatisData: state.querySpecialTypeStatisData,
        setPhoneAlarmData: state.setPhoneAlarmData,
        appendPhoneAlarmData: state.appendPhoneAlarmData,
        clearPhoneAlarmData: state.clearPhoneAlarmData
    }));

    const onMessage = (event: MessageEvent<any>) => {
        console.log('SSE message:', event);
        try {
            if (typeof event.data === 'string') {
                const data: PhoneAlarmInfo = JSON.parse(event.data);
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
            //         message: "{\"arfcn\":1765.0,\"captureTime\":\"2023-08-16T15:00:05\",\"deviceId\":\"RS_071\",\"protocol\":\"中国电信FDD-LTE\",\"protocolType\":7,\"rssi\":-40,\"status\":0,\"warnLevel\":1,\"warnReason\":\"中国电信FDD\"}"
            //     })
            //         .then(res => console.log(res))
            //         .catch(err => console.log(err));
            // }, 1000 * 10);
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
            ipcRenderer.send('reload');
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

    return <DashboardBox>
        <div className="left-box">
            {/* <AlarmSiteTopChart /> */}
            <WhiteListTop />
            <SpecialTypeChart />
            <AlarmWeekChart />
            <AlarmTypeChart />
        </div>
        <div className="center-box">
            <div className="main-box">
                <div className="alarm-bg">
                    {
                        alarmType === AlarmType.Single
                            ? <div className="phone-panel">
                                <RadarInfo
                                    data={{}}
                                    open={true} />
                            </div>
                            : <div className="phone-panel">
                                <Bibo />
                            </div>
                    }
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