import dayjs from 'dayjs';
import { FC } from 'react';
import { Descriptions, Modal } from 'antd';
import { helper } from '@/utility/helper';
import { SignalDescModalProp } from './prop';

const { Item } = Descriptions;
const bands = helper.readBand();

/**
 * 可疑持续信号详情
 */
const SignalDescModal: FC<SignalDescModalProp> = ({
    open, data, onCancel
}) => {

    const renderTime = (value: number | undefined) => {
        if (value === undefined) {
            return '-';
        }

        return dayjs.unix(value).format('YYYY-MM-DD HH:mm:ss');
    };

    const renderBandName = (value: string | undefined) => {
        if (value === undefined) {
            return '-';
        }

        let txt = '';
        const freq = Number.parseFloat(value);
        if (freq >= 101 && freq <= 112) {
            const has = bands.find(i => i.code === freq);
            txt = has === undefined ? '-' : has.name;
        } else {
            txt = `${value}`
        }
        return txt;
    };

    return <Modal
        footer={null}
        onCancel={onCancel}
        open={open}
        title="可疑持续信号"
        getContainer="#app"
        centered={true}
        maskClosable={false}
        destroyOnClose={true}>
        <Descriptions bordered={true} size="small" style={{ marginTop: '20px' }}>
            <Item label="频段" span={3}>{renderBandName(data?.freqBand)}</Item>
            <Item label="最新频率" span={3}>{data?.lastFreq ?? '-'}</Item>
            <Item label="最近强度" span={3}>{data?.lastRssi ?? '-'}</Item>
            <Item label="设备ID" span={3}>{data?.deviceId ?? '-'}</Item>
            <Item label="协议名称" span={3}>{data?.protocolName ?? '-'}</Item>
            <Item label="持续时间" span={3}>{data?.duration === undefined ? '-' : `${data.duration}s`}</Item>
            <Item label="起始时间" span={3}>{renderTime(data?.startTime)}</Item>
            <Item label="结束时间" span={3}>{renderTime(data?.endTime)}</Item>
        </Descriptions>
    </Modal>
};

export { SignalDescModal };