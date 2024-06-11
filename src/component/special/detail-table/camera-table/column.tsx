import round from 'lodash/round';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Terminal } from '@/schema/terminal';
import { Protocol, getProtocolText } from '@/schema/protocol';
import { NoWarpLabel } from '@/component/panel/panel';

const getColumns = (): ColumnsType<Terminal> => {
    return [{
        title: '类型',
        key: 'protocolType',
        dataIndex: 'protocolType',
        width: 80,
        align: 'center',
        render: (val: Protocol) => getProtocolText(val)
    },
    {
        title: 'MAC地址',
        key: 'mac',
        dataIndex: 'mac',
        width: 140
    },
    {
        title: 'apMac',
        key: 'apMac',
        dataIndex: 'apMac'
    },
    {
        title: 'ssid',
        key: 'ssid',
        dataIndex: 'ssid'
    },
    {
        title: '强度',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 60,
        render(val) {
            return val + 'dBm';
        }
    },
    {
        title: '连接状态',
        key: 'isConnect',
        dataIndex: 'isConnect',
        align: 'center',
        width: 100,
        render: (val: number) => val === 0
            ? <Tag color="orange" style={{ marginRight: 0 }}>未连接</Tag>
            : <Tag color="green" style={{ marginRight: 0 }}>已连接</Tag>
    }, {
        title: '厂商',
        key: 'org',
        dataIndex: 'org',
        width: 160,
        render(val: string) {
            return <NoWarpLabel title={val} width={150}>{val}</NoWarpLabel>;
        }
    }, {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId'
    }, {
        title: '设备场所',
        key: 'siteName',
        dataIndex: 'siteName',
        width: 160,
        render(val: string) {
            return <NoWarpLabel title={val} width={150}>{val}</NoWarpLabel>;
        }
    }, {
        title: '距离',
        key: 'distance',
        dataIndex: 'distance',
        width: 120,
        render(val: number) {
            return `约${round(val, 1)}米`;
        }
    }, {
        title: '时间',
        key: 'captureTime',
        dataIndex: 'captureTime',
        align: 'center',
        width: 230
    }];
};

export { getColumns };