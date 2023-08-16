import debounce from 'lodash/debounce';
import { FC, memo, useEffect, MouseEvent } from "react";
import { Button, Typography } from "antd";
import {
    ThunderboltOutlined, LoadingOutlined, MobileOutlined,
    CloseSquareOutlined
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

const { Text } = Typography;
let sse: EventSource | null = null;

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
        queryQuickCheckReport,
        appendPhoneAlarmData,
        removePhoneAlarmData
    } = useModel(state => ({
        startTime: state.startTime,
        quickCheckLoading: state.quickCheckLoading,
        phoneAlarmData: state.phoneAlarmData,
        setQuickCheckLoading: state.setQuickCheckLoading,
        quickCheckStart: state.quickCheckStart,
        quickCheckStop: state.quickCheckStop,
        queryQuickCheckReport: state.queryQuickCheckReport,
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
                        id: helper.nextId()
                    });
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
            sse = instance(onMessage);
            // setInterval(() => {
            //     console.clear();
            //     console.log('/sse/push-user');
            //     request.post(`/sse/push-user`, { hash })
            //         .then(res => console.log(res))
            //         .catch(err => console.log(err));
            // }, 10000);
        }

        return () => {
            closeSse();
        };
    }, []);

    /**
     * 移除报警信息
     */
    const onPhoneAlarmDelete = (id: string) =>
        removePhoneAlarmData(id);

    const onCheckClick = debounce(async (event: MouseEvent) => {
        event.preventDefault();
        setQuickCheckLoading(true);
        try {
            if (startTime === '') {
                //开始
                await quickCheckStart();
            } else {
                //停止
                await Promise.all([
                    quickCheckStop(),
                    queryQuickCheckReport()
                ]);
                // await quickCheckStop();
                // await queryQuickCheckReport();
            }
        } catch (error) {
            console.warn(error);
        } finally {
            setQuickCheckLoading(false);
        }
    }, 1000, { leading: true, trailing: false });

    const renderPhoneAlarm = () =>
        phoneAlarmData.map(
            (item, index) => <div className="phone-alarm" key={`PA_${index}`}>
                <Button
                    onClick={() => onPhoneAlarmDelete(item.id)}
                    type="link"
                    className="close"
                    title="关闭">
                    <CloseSquareOutlined />
                </Button>
                <div className="icon">
                    <MobileOutlined />
                </div>
                <div className="info">
                    <div>协议名称：{item?.protocolName ?? '-'}</div>
                    <div>设备地址：{item?.siteName ?? '-'}</div>
                </div>
            </div>
        );

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
            <CheckReport />
        </div>
    </DashboardBox>
});

export { Dashboard };