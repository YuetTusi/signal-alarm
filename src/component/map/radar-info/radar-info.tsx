import { FC, useEffect } from 'react';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { Button } from 'antd';
import { useModel } from '@/model';
import { RadarBox } from './styled/box';
import { RadarInfoProp } from './prop';
import { AlarmMessage } from '@/schema/phone-alarm-info';

/**
 * 报警详情
 */
const RadarInfo: FC<RadarInfoProp> = ({ open, deviceId, onClose }) => {

    const {
        phoneAlarmData
    } = useModel(state => ({
        phoneAlarmData: state.phoneAlarmData
    }));

    const render = () => {
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
            <div className="radar" />
        </div>
        <div className="right">
            {render()}
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