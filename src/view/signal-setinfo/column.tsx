import round from 'lodash/round';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import { ContinuousSignal } from '@/schema/continuous-signal';
import { Protocol, getProtocolLabel } from '@/schema/protocol';
import { helper } from '@/utility/helper';

const band = helper.readBand();

const getColumns = (): ColumnsType<ContinuousSignal> => [{
    title: '频段',
    key: 'freqBand',
    dataIndex: 'freqBand',
    render(val: string, record) {
        const freq = Number.parseInt(val);
        if (freq >= 101 && freq <= 113) {
            const has = band.find(i => i.code === freq);
            return has === undefined ? '-' : has.name ?? '-';
        } else {
            return record.protocolType === Protocol.Others ? '疑似窃密信号' : val;
        }
    }
}, {
    title: '最新频率',
    key: 'lastFreq',
    dataIndex: 'lastFreq',
    render(val: number) {
        return `${round(val, 1)}MHz`;
    }
}, {
    title: '最近强度值',
    key: 'lastRssi',
    dataIndex: 'lastRssi'
}, {
    title: '首次频率',
    key: 'firstFreq',
    dataIndex: 'firstFreq',
    render(val: number) {
        return `${round(val, 1)}MHz`;
    }
}, {
    title: '首次强度值',
    key: 'firstRssi',
    dataIndex: 'firstRssi'
}, {
    title: '协议类型',
    key: 'protocolType',
    dataIndex: 'protocolType',
    render: (value: Protocol) => {
        return getProtocolLabel(value);
    }
}, {
    title: '无线协议名称',
    key: 'protocolName',
    dataIndex: 'protocolName'
}, {
    title: '设备',
    key: 'deviceId',
    dataIndex: 'deviceId'
}, {
    title: '开始时间',
    key: 'startTime',
    dataIndex: 'startTime',
    align: 'center',
    width: 220,
    render: (value: number) => dayjs.unix(value).format('YYYY-MM-DD HH:mm:ss')
}, {
    title: '结束时间',
    key: 'endTime',
    dataIndex: 'endTime',
    align: 'center',
    width: 220,
    render: (value: number) => dayjs.unix(value).format('YYYY-MM-DD HH:mm:ss')
}, {
    title: '持续时间',
    key: 'duration',
    dataIndex: 'duration',
    width: 120,
    render: (value: number) => `${value}秒`
}];


export { getColumns };