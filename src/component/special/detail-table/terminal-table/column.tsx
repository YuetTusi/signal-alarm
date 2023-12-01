import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Terminal } from '@/schema/terminal';
import { Protocol, getProtocolLabel } from '@/schema/protocol';
import { NoWarpLabel } from '@/component/panel/panel';
import { ActionType } from './prop';

const getColumns = (handle: (actionType: ActionType, data: Terminal) => void): ColumnsType<Terminal> => {
    return [{
        title: '类型',
        key: 'protocolType',
        dataIndex: 'protocolType',
        width: 80,
        align: 'center',
        render: (val: Protocol) => {
            switch (val) {
                case Protocol.WiFi24G:
                    return '终端2.4G';
                case Protocol.WiFi58G:
                    return '终端5.8G';
            }
        }
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
        width: 80
    },
    {
        title: '连接状态',
        key: 'isConnect',
        dataIndex: 'isConnect',
        align: 'center',
        width: 80,
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
    }, {
        title: '设备场所',
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
        width: 170
    }, {
        title: '白名单',
        key: 'whiteList',
        dataIndex: 'whiteList',
        align: 'center',
        width: 70,
        render(_: any, record) {
            return <Button
                onClick={() => handle(ActionType.AddToWhiteList, record)}
                type="link"
                size='small'>
                <PlusOutlined />
            </Button>
        }
    }];
};

const getTopColumns = (): ColumnsType<Terminal> => {
    return [{
        title: '类型',
        key: 'protocolType',
        dataIndex: 'protocolType',
        render: (val: number) => {
            return getProtocolLabel(val);
        }
    }, {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId'
    }, {
        title: '设备场所',
        key: 'siteName',
        dataIndex: 'siteName'
    },
    {
        title: '强度值',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 80
    }];
};


export { getColumns, getTopColumns };