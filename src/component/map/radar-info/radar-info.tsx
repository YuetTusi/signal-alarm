import maxBy from 'lodash/maxBy';
import dayjs from 'dayjs';
import { FC, useRef, useEffect, useState } from 'react';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { Button } from 'antd';
import { helper } from '@/utility/helper'
import { Protocol } from '@/schema/protocol';
import { AlarmType } from '@/schema/conf';
import { AlarmMessage } from '@/schema/phone-alarm-info';
import { Point } from './point';
import { pointMap, getLoopIndex } from './rnd-point';
import { RadarBox } from './styled/box';
import { PointAt, RadarInfoProp } from './prop';
import useModel from '@/model';

const { alarmType } = helper.readConf();

let timer: any = null;

/**
 * 报警详情
 */
const RadarInfo: FC<RadarInfoProp> = ({ data, deviceId, onClose }) => {

    const m = useRef<Map<Protocol, PointAt>>(new Map());//缓存位置点
    const { setSound } = useModel(state => ({ setSound: state.setSound }));

    useEffect(() => {
        let alarms: AlarmMessage[] = [];

        //单机版
        for (let [, v] of Object.entries(data)) {
            alarms = alarms.concat(v.filter(item => {
                //过滤掉超过10秒的点
                const isOver = dayjs().diff(item.captureTime, 's') <= 10;
                return isOver;
            }));
        }

        setSound(alarms.length > 0);
    }, [data, deviceId]);

    const renderPoint = () => {

        let alarms: AlarmMessage[] = [];

        //单机版
        for (let [, v] of Object.entries(data)) {
            alarms = alarms.concat(v.filter(item => {
                //过滤掉超过10秒的点
                const isOver = dayjs().diff(item.captureTime, 's') <= 10;
                return isOver;
            }));
        }

        return alarms.map((item, index) => {
            const loop = getLoopIndex(Number(item.rssi!)); //信号强度所在环数
            const points = pointMap.get(loop)!;//该环上所有的点，随机取
            let top = 0, left = 0;
            if (m.current.has(item.protocolType!)) {
                //如果已有该协议的数据，且环数相同，则不更换top&left值
                const p = m.current.get(item.protocolType!)!;
                if (p?.loop === loop) {
                    // console.log('环数相同', p.loop, loop);
                    top = p.top;
                    left = p.left;
                } else {
                    // console.log('环数不同', p.loop, loop);
                    top = points[helper.rnd(0, points.length)].top;
                    left = points[helper.rnd(0, points.length)].left;
                    m.current.set(item.protocolType!, { top, left, loop });
                }

            } else {
                top = points[helper.rnd(0, points.length)].top;
                left = points[helper.rnd(0, points.length)].left;
                // console.log(`强度：${Number(item.rssi!)},环数：${loop}, 点：${top}-${left}`);
                m.current.set(item.protocolType!, { top, left, loop });
            }

            return <Point
                // visible={dayjs().diff(item.captureTime, 's') <= 5}
                top={top}
                left={left}
                data={item}
                key={`P_${index}`} />;
        });
    };

    const points = renderPoint();

    const renderInfo = () => {

        if (points === null || points.length === 0) {
            return null;
        }

        let alarms: AlarmMessage[] = [];
        if (alarmType === AlarmType.Single) {
            //单机版
            alarms = Object.values(data).flat();
        } else {
            //网络版（筛选当前deviceId的最新报警）
            if (deviceId === undefined || data[deviceId] === undefined) {
                return null;
            }
            alarms = data[deviceId];
        }

        if (alarms.length > 0) {
            const msg = maxBy(alarms, (item) => item.captureTime);
            // const msg = next[next.length - 1];

            return <div className="adetail">
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

    return <RadarBox>
        <div className="left">

        </div>
        <div className="center">
            <div className="radar-outer">
                <div className="radar" />
                {points}
            </div>
        </div>
        <div className="right">
            {renderInfo()}
        </div>
        {
            alarmType === AlarmType.Single
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
    onClose: () => { }
};

export { RadarInfo };