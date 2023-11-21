import debounce from 'lodash/debounce';
import { FC } from 'react';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { Button } from 'antd';
import { useModel } from '@/model';
import { helper } from '@/utility/helper'
import { getProtocolName } from '@/schema/protocol';
import { AlarmMessage } from '@/schema/phone-alarm-info';
import { RadarBox } from './styled/box';
import { RadarInfoProp } from './prop';

/**
 * 报警详情
 */
const RadarInfo: FC<RadarInfoProp> = ({ open, deviceId, onClose }) => {

    const {
        phoneAlarmData
    } = useModel(state => ({
        phoneAlarmData: state.phoneAlarmData
    }));

    /**
     * 渲染协议点
     */
    const renderPoint = () => {
        const dom: JSX.Element[] = [];
        for (let i = 0; i < phoneAlarmData.slice(0, 10).length; i++) {
            let message: AlarmMessage;
            try {
                if (typeof phoneAlarmData[i].message === 'string') {
                    message = JSON.parse(phoneAlarmData[i].message);
                } else {
                    message = phoneAlarmData[i].message as any;
                }
                if (message.deviceId === deviceId) {
                    dom.push(<div
                        style={{
                            left: `${helper.rnd(15, 65)}%`,
                            top: `${helper.rnd(15, 75)}%`,
                            animation: `flash${helper.rnd(1, 4)} 2s infinite`
                        }}
                        className={`pointer ${getProtocolName(message.protocolType!)}`} />);
                }
            } catch (error) {
                continue;
            }
        }
        return dom;
    };

    /**
     * 渲染详情
     */
    const renderInfo = () => {
        const currentAlarms = phoneAlarmData.filter(item => {
            let message: AlarmMessage;
            if (typeof item.message === 'string') {
                message = JSON.parse(item.message);
            } else {
                message = item.message;
            }
            return message.deviceId === deviceId;
        });
        if (currentAlarms.length === 0) {
            return null;
        }

        const [alarm] = currentAlarms;
        if (typeof alarm?.message === 'string') {
            try {
                const msg: AlarmMessage = JSON.parse(alarm.message);
                return <div className="adetail">
                    <div>
                        <label htmlFor="h2">强度值：</label>
                        <h2>{msg.rssi ?? ''}</h2>
                    </div>
                    <div>
                        <label htmlFor="span">设备ID：</label>
                        <span>{msg.deviceId ?? '-'}</span>
                    </div>
                    <div>
                        <label htmlFor="span">协议名称：</label>
                        <span>{msg.protocol ?? '-'}</span>
                    </div>
                    <div>
                        <label htmlFor="span">场所名称：</label>
                        <span>{msg.siteName ?? '-'}</span>
                    </div>
                    <div>
                        <label htmlFor="span">告警级别：</label>
                        <span>{msg.warnLevel ?? '-'}</span>
                    </div>
                    <div>
                        <label htmlFor="span">告警原因：</label>
                        <span>{msg.warnReason ?? '-'}</span>
                    </div>
                    <div>
                        <label htmlFor="span">采集时间：</label>
                        <span>{msg.captureTime ?? '-'}</span>
                    </div>
                </div>
            } catch (error) {
                console.warn(error);
                return null;
            }
        } else {
            return null;
        }
    };

    return <RadarBox style={{ display: open ? 'flex' : 'none' }}>
        <div className="left">

        </div>
        <div className="center">
            <div className="radar">
                {renderPoint()}
            </div>
        </div>
        <div className="right">
            {renderInfo()}
        </div>
        <Button
            onClick={() => onClose()}
            title="关闭"
            type="link"
            ghost={true}
            className="close-radar">
            <CloseCircleOutlined />
        </Button>
    </RadarBox>;
};

RadarInfo.defaultProps = {
    open: false,
    onClose: () => { }
};

export { RadarInfo };