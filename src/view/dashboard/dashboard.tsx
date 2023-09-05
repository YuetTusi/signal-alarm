import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import electron, { IpcRendererEvent } from 'electron';
import { FC, memo, useEffect, MouseEvent } from "react";
import { Button, Typography } from "antd";
import {
    ClockCircleOutlined, LoadingOutlined, MobileOutlined
} from '@ant-design/icons';
import useModel from "@/model";
import { helper } from '@/utility/helper';
import { instance, closeSse } from '@/utility/sse';
import { StorageKeys } from '@/utility/storage-keys';
import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import WapInfo from "@/component/special/wap-info";
import { AlarmInfo } from '@/component/alarm';
import {
    AlarmTypeChart, AlarmSiteTopChart, SpecialTypeChart, AlarmWeekChart
} from '@/component/statis';
import CheckReport from '@/component/check-report';
import { DashboardBox } from "./styled/box";
// import { request } from '@/utility/http';

const { ipcRenderer } = electron;
const { Text } = Typography;

/**
 * 返回绝对定位的类选择器名称
 * @param index 索引
 * @param len 报警消息数量
 */
const getClassName = (index: number, len: number) => {
    switch (len) {
        case 1:
            return 'center';
        case 2:
            return index === 0 ? 'left' : 'right';
        case 3:
            if (index === 0) {
                return 'center'
            } else if (index === 1) {
                return 'left'
            } else {
                return 'right'
            }
        default:
            return 'hidden';
    }
};

/**
 * 主页
 */
const Dashboard: FC<{}> = memo(() => {
    const {
        startTime,
        quickCheckLoading,
        phoneAlarmData,
        setQuickCheckLoading,
        quickCheckStart,
        quickCheckStop,
        queryAlarmTop10Data,
        queryQuickCheckReport,
        setPhoneAlarmData,
        appendPhoneAlarmData,
        removePhoneAlarmData
    } = useModel(state => ({
        startTime: state.startTime,
        quickCheckLoading: state.quickCheckLoading,
        phoneAlarmData: state.phoneAlarmData,
        setQuickCheckLoading: state.setQuickCheckLoading,
        quickCheckStart: state.quickCheckStart,
        quickCheckStop: state.quickCheckStop,
        queryAlarmTop10Data: state.queryAlarmTop10Data,
        queryQuickCheckReport: state.queryQuickCheckReport,
        setPhoneAlarmData: state.setPhoneAlarmData,
        appendPhoneAlarmData: state.appendPhoneAlarmData,
        removePhoneAlarmData: state.removePhoneAlarmData
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

        const userId = sessionStorage.getItem(StorageKeys.UserId);
        const hash = sessionStorage.getItem(StorageKeys.MsgKey);
        if (userId !== null && hash !== null) {
            instance(onMessage);
            // setInterval(() => {
            //     request.post(`/sse/push-user`, {
            //         hash,
            //         userId,
            //         message: "{\"arfcn\":1765.0,\"captureTime\":\"2023-08-16T15:00:05\",\"deviceId\":\"RS_177\",\"protocol\":\"中国电信FDD-LTE\",\"protocolType\":7,\"rssi\":-40,\"status\":0,\"warnLevel\":1,\"warnReason\":\"中国电信FDD\"}"
            //     })
            //         .then(res => console.log(res))
            //         .catch(err => console.log(err));
            // }, 1000 * 10);
        }

        return () => {
            closeSse();
        };
    }, []);

    const alarmClean = (_: IpcRendererEvent) => {
        const now = new Date().getTime();

        const removeAlarms = phoneAlarmData.reduce((acc, current) => {
            const sec = dayjs(now).diff(dayjs(current.receiveTime), 'second');
            if (sec > 30) {
                //清除掉30秒以上的报警消息
                acc.push(current);
            }
            return acc;
        }, [] as PhoneAlarmInfo[]);

        removeAlarms.forEach(item => {
            removePhoneAlarmData(item.id);
        });
    };

    /**
     * 清空所有报警消息
     */
    const alarmDropAll = (_: IpcRendererEvent) => {
        setPhoneAlarmData([]);
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
    }, [alarmClean]);


    const onCheckClick = debounce(async (event: MouseEvent) => {
        event.preventDefault();
        setQuickCheckLoading(true);
        try {
            if (startTime === '') {
                //开始
                await quickCheckStart();
            } else {
                //停止
                await quickCheckStop();
                await queryQuickCheckReport();
            }
        } catch (error) {
            console.warn(error);
        } finally {
            setQuickCheckLoading(false);
        }
    }, 1000, { leading: true, trailing: false });

    const renderPhoneAlarm = () => {

        const top3 = phoneAlarmData.slice(0, 3); //只取前3个报警信息
        const len = top3.length;
        return top3.map(
            (item, index) => {
                let data: Record<string, any> = {};
                try {
                    if (typeof item.message === 'string') {
                        data = JSON.parse(item.message);
                    } else {
                        data = item?.message ?? {};
                    }
                } catch (error) {
                    console.warn('推送message转换JSON失败', error.message);
                }
                return <div className={`phone-alarm ${getClassName(index, len)}`} key={`PA_${index}`}>
                    <div className="icon">
                        <MobileOutlined />
                    </div>
                    <div className="info">
                        <div>协议类型：{data?.protocol ?? '-'}</div>
                        <div>强度：{data?.rssi ?? '-'}</div>
                        <div>设备ID：{data?.deviceId ?? '-'}</div>
                        <div>频点信息：{data?.arfcn ?? '-'}</div>
                        <div>告警级别：{data?.warnLevel ?? '-'}</div>
                        <div>告警原因：{data?.warnReason ?? '-'}</div>
                        <div>采集时间：{data?.captureTime ?? '-'}</div>
                    </div>
                </div>;
            }
        );
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
                        <Text style={{ fontSize: '12px', marginRight: '10px' }} type="success">
                            {startTime === '' ? '' : `开始时间：${startTime}`}
                        </Text>
                        <Button
                            onClick={onCheckClick}
                            disabled={quickCheckLoading}
                            type="primary">
                            {quickCheckLoading ? <LoadingOutlined /> : <ClockCircleOutlined />}
                            <span>{startTime === '' ? '长时检测' : '停止长时检测'}</span>
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
            <CheckReport />
        </div>
    </DashboardBox>
});

export { Dashboard };