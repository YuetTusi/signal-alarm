import { FC } from 'react';
import { Popover } from 'antd';
import { useModel } from '@/model';
import { ComDevice, DeviceState } from '@/schema/com-device';
import { AlarmMessage } from '@/schema/phone-alarm-info';
import { AlarmTable } from './alarm-table';

/**
 * 设备（圆点）
 */
const PointItem: FC<{ data: ComDevice }> = ({ data }) => {

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
            ? <div className="cell">
                <div className="dev-item-box">
                    <Popover
                        content={<AlarmTable data={next} />}
                        placement="right">
                        <div className="dev-box">
                            <div className="qiu red">
                                {next.length}
                            </div>
                            <span>{data.siteName ?? '-'}</span>
                        </div>
                        {/* <div
                        className="dev-item red">
                        <i>
                            <WifiOutlined />
                        </i>
                        <div>{data.siteName ?? '-'}</div>
                        <div>{data.deviceName ?? '-'}</div>
                    </div> */}
                    </Popover>
                </div>
            </div>
            : <div className="cell">
                <div className="dev-item-box">
                    <div>
                        <div className={`qiu ${data.status === DeviceState.Normal ? 'green' : 'gray'}`} />
                        <span>{data.siteName ?? '-'}</span>
                    </div>
                    {/* <div
                    className={`dev-item ${data.status === DeviceState.Normal ? 'green' : 'gray'}`}>
                    <i>
                        <WifiOutlined />
                    </i>
                    <div>{data.siteName ?? '-'}</div>
                    <div>{data.deviceName ?? '-'}</div>
                </div> */}
                </div>
            </div>;
    };

    return renderMessage();
};

export { PointItem };