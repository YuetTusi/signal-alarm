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
    render(val: string) {
        const freq = Number.parseInt(val);
        if (freq >= 101 && freq <= 113) {
            const has = band.find(i => i.code === freq);
            return has === undefined ? '-' : has.name ?? '-';
        } else {
            return val;
        }
    }
}, {
    title: '最新频率',
    key: 'lastFreq',
    dataIndex: 'lastFreq'
}, {
    title: '首次频率',
    key: 'firstFreq',
    dataIndex: 'firstFreq'
}, {
    title: '首次强度值',
    key: 'firstRssi',
    dataIndex: 'firstRssi'
}, {
    title: '最新强度',
    key: 'lastRssi',
    dataIndex: 'lastRssi'
}, {
    title: '协议类型',
    key: 'protocolType',
    dataIndex: 'protocolType',
    render: (value: Protocol) => getProtocolLabel(value)
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