import throttle from 'lodash/throttle';
import { FC, MouseEvent, useRef } from 'react';
import { Popover } from 'antd';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import { useModel } from '@/model';
import { ComDevice, DeviceState } from '@/schema/com-device';
import { AlarmMessage } from '@/schema/phone-alarm-info';
import { AlarmTable } from './alarm-table';

/**
 * 设备
 */
const DevItem: FC<{ data: ComDevice }> = ({ data }) => {

    const {
        phoneAlarmData
    } = useModel((state) => ({
        phoneAlarmData: state.phoneAlarmData
    }));

    /**
     * 渲染报警消息表
     */
    const renderMessage = () => {
        const next = phoneAlarmData
            .slice(0, 5)
            .reduce<AlarmMessage[]>((acc, current) => {
                try {
                    const message: AlarmMessage = JSON.parse(current.message);
                    if (message.deviceId === data.deviceId) {
                        acc.push(message);
                    }
                    return acc;
                } catch (error) {
                    return acc;
                }
            }, []);
        return next.length > 0
            ? <div className="dev-item-box">
                <Popover
                    content={<AlarmTable data={next} />}
                    placement="right">
                    <div
                        className="dev-item red">
                        <i>
                            <EnvironmentOutlined />
                        </i>
                        <div>{data.siteName ?? '-'}</div>
                        <div>{data.deviceName ?? '-'}</div>
                        <div>{data.deviceId ?? '-'}</div>
                    </div>
                </Popover>
            </div>
            : <div className="dev-item-box">
                <div
                    className={`dev-item ${data.status === DeviceState.Normal ? 'green' : 'gray'}`}>
                    <i>
                        <EnvironmentOutlined />
                    </i>
                    <div>{data.siteName ?? '-'}</div>
                    <div>{data.deviceName ?? '-'}</div>
                    <div>{data.deviceId ?? '-'}</div>
                </div>
            </div>;
    };

    return renderMessage();
};

export { DevItem };