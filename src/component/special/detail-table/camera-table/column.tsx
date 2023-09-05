import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Terminal } from '@/schema/terminal';
import { Protocol, getProtocolLabel } from '@/schema/protocol';
import { NoWarpLabel } from '@/component/panel/panel';

const getColumns = (): ColumnsType<Terminal> => {
    return [{
        title: '类型',
        key: 'protocolType',
        dataIndex: 'protocolType',
        width: 80,
        align: 'center',
        render: (val: Protocol) => getProtocolLabel(val)
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
        title: '强度值',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 60
    },
    {
        title: '连接状态',
        key: 'isConnect',
        dataIndex: 'isConnect',
        align: 'center',
        width: 75,
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
        dataIndex: 'deviceId',
        width: 120
    }, {
        title: '设备地址',
        key: 'siteName',
        dataIndex: 'siteName',
        width: 160,
        render(val: string) {
            return <NoWarpLabel title={val} width={150}>{val}</NoWarpLabel>;
        }
    }, {
        title: '时间',
        key: 'captureTime',
        dataIndex: 'captureTime',
        align: 'center',
        width: 150
    }];
};

export { getColumns };