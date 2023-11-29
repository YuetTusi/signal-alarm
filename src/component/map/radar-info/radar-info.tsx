import maxBy from 'lodash/maxBy';
import dayjs from 'dayjs';
import { FC, useRef } from 'react';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { Button } from 'antd';
import { helper } from '@/utility/helper'
import { Protocol, getProtocolName } from '@/schema/protocol';
import { AlarmMessage, PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { RadarBox } from './styled/box';
import { RadarInfoProp } from './prop';
import { pointMap, getLoopIndex } from './rnd-point';
import { Point } from './point';
import { useLastPhoneAlarmOfDevice, usePhoneAlarmOfDevice } from '@/hook';

/**
 * 报警详情
 */
const RadarInfo: FC<RadarInfoProp> = ({ open, data, deviceId, onClose }) => {

    const m = useRef<Map<Protocol, { top: number, left: number }>>(new Map());//缓存位置点

    const renderPoint = () => {
        if (deviceId === undefined || data[deviceId] === undefined) {
            return null;
        }

        return data[deviceId].map((item, index) => {

            const loop = getLoopIndex(Number(item.rssi!)); //信号强度所在环数
            console.log(`强度：${Number(item.rssi!)},环数：${loop}`);
            const points = pointMap.get(loop)!;//该环上所有的点，随机取
            let top = 0, left = 0;
            if (m.current.has(item.protocolType!)) {
                top = m.current.get(item.protocolType!)?.top!;
                left = m.current.get(item.protocolType!)?.left!;
            } else {
                top = points[helper.rnd(0, points.length)].top;
                left = points[helper.rnd(0, points.length)].left;
                m.current.set(item.protocolType!, { top, left });
            }

            return <Point
                top={top}
                left={left}
                data={item}
                key={`P_${index}`} />;
        });
    };

    const renderInfo = () => {
        if (deviceId === undefined || data[deviceId] === undefined) {
            return null;
        }

        const next = data[deviceId];
        if (next.length > 0) {
            const msg = maxBy(next, (item) => item.captureTime);
            // const msg = next[next.length - 1];

            return <div style={{ display: dayjs().diff(dayjs(msg?.captureTime), 's') > 5 ? 'none' : 'block' }} className="adetail">
                <div>
                    <label htmlFor="h2">强度值：</label>
                    <h2>{msg?.rssi ?? ''}</h2>
                </div>
                <div>
                    <label htmlFor="span">设备ID：</label>
                    <span>{msg?.deviceId ?? '-'}</span>
                </div>
                <div>
                    <label htmlFor="span">协议名称：</label>
                    <span>{msg?.protocol ?? '-'}</span>
                </div>
                <div>
                    <label htmlFor="span">场所名称：</label>
                    <span>{msg?.siteName ?? '-'}</span>
                </div>
                <div>
                    <label htmlFor="span">告警原因：</label>
                    <span>{msg?.warnReason ?? '-'}</span>
                </div>
                <div>
                    <label htmlFor="span">采集时间：</label>
                    <span>{msg?.captureTime ?? '-'}</span>
                </div>
            </div>;
        } else {
            return null;
        }
    };

    return <RadarBox style={{ display: open ? 'flex' : 'none' }}>
        <div className="left">

        </div>
        <div className="center">
            <div className="radar-outer">
                <div className="radar" />
                {renderPoint()}
            </div>
        </div>
        <div className="right">
            {renderInfo()}
        </div>
        {
            data === undefined
                ? null
                : <Button
                    onClick={() => onClose!()}
                    title="关闭"
                    type="link"
                    className="close-radar">
                    <CloseCircleOutlined />
                </Button>
        }
    </RadarBox>;
};

RadarInfo.defaultProps = {
    open: false,
    onClose: () => { }
};

export { RadarInfo };