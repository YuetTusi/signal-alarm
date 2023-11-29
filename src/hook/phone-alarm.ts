import groupBy from 'lodash/groupBy';
import { useEffect, useState } from 'react';
import { AlarmMessage, PhoneAlarmInfo } from '@/schema/phone-alarm-info';

/**
 * 使用报警数据
 * @param alarmData 报警数据
 */
const usePhoneAlarm = (alarmData: PhoneAlarmInfo[]) => {

    const [data, setData] = useState<{ [deviceId: string]: AlarmMessage[] }>({});

    useEffect(() => {
        const message = alarmData.reduce((acc, current) => {
            try {
                const next: AlarmMessage = JSON.parse(current.message);
                const i = acc.findIndex(item => item.protocolType === next.protocolType);
                if (i === -1) {
                    //不存在该协议数据，则添加
                    acc.push(next);
                } else {
                    //如果已存在该协议数据，则用最新一条覆盖
                    acc[i] = next;
                }
            } catch (error) {
                console.warn(error);
            }
            return acc;
        }, [] as AlarmMessage[]);
        setData(groupBy(message, 'deviceId'));
    }, [alarmData]);

    return data;
};

/**
 * 使用当前设备的报警数据
 * @param deviceId 设备id
 * @param alarmData 报警数据
 */
const usePhoneAlarmOfDevice = (deviceId: string, alarmData: PhoneAlarmInfo[]) => {

    const [data, setData] = useState<AlarmMessage[]>([]);

    useEffect(() => {
        const message = alarmData
            .map(item => item.message);
        try {
            const next = message.reduce((acc, current) => {
                const alarm: AlarmMessage = JSON.parse(current);
                if (alarm.deviceId === deviceId) {
                    acc.push(alarm);
                }
                return acc;
            }, [] as AlarmMessage[]);
            setData(next);
        } catch (error) {
            console.warn(error);
            setData([]);
        }
    }, [deviceId, alarmData]);

    return data;
};

/**
 * 使用当前设备最新的报警数据
 * @param deviceId 设备id
 * @param alarmData 报警数据
 */
const useLastPhoneAlarmOfDevice = (deviceId: string, alarmData: PhoneAlarmInfo[]) => {

    const [data, setData] = useState<AlarmMessage>();

    useEffect(() => {
        try {
            const message: AlarmMessage[] = alarmData
                .map(item => JSON.parse(item.message));

            if (message.length > 0) {
                setData(message[message.length - 1]);
            } else {
                setData(undefined);
            }
        } catch (error) {
            console.warn(error);
            setData(undefined);
        }
    }, [deviceId, alarmData]);

    return data;
};


export { usePhoneAlarm, usePhoneAlarmOfDevice, useLastPhoneAlarmOfDevice };