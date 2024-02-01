import { ColumnsType } from 'antd/es/table';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button } from 'antd';
import { Hotspot } from '@/schema/hotspot';
import { getProtocolText } from '@/schema/protocol';
import { NoWarpLabel } from '@/component/panel/panel';
import { ActionType } from './prop';

const getColumns = (handle: (actionType: ActionType, data: Hotspot) => void): ColumnsType<Hotspot> => {
    return [{
        title: '类型',
        key: 'protocolType',
        dataIndex: 'protocolType',
        width: 80,
        align: 'center',
        render: (val: any) => getProtocolText(val)
    }, {
        title: '热点',
        key: 'ssid',
        dataIndex: 'ssid',
        width: 140,
        render(val: string) {
            return <NoWarpLabel title={val} width={150}>{val}</NoWarpLabel>;
        }
    }, {
        title: 'APID',
        key: 'apId',
        dataIndex: 'apId',
    }, {
        title: 'MAC地址',
        key: 'mac',
        dataIndex: 'mac',
        width: 140
    }, {
        title: '强度',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 80
    }, {
        title: '厂商',
        key: 'org',
        dataIndex: 'org',
        render(val: string) {
            return <NoWarpLabel title={val} width={120}>{val}</NoWarpLabel>;
        }
    }, {
        title: '频点号',
        key: 'channel',
        dataIndex: 'channel',
        width: 80
    }, {
        title: '第二频点',
        key: 'secondChannel',
        dataIndex: 'secondChannel',
        width: 100
    },
    {
        title: '上行流量',
        key: 'upStream',
        dataIndex: 'upStream',
    },
    {
        title: '下行流量',
        key: 'downStream',
        dataIndex: 'downStream',
    },
    {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId',
    }, {
        title: '设备场所',
        key: 'siteName',
        dataIndex: 'siteName',
        width: 150,
        render(val: string) {
            return <NoWarpLabel title={val} width={150}>{val}</NoWarpLabel>;
        }
    }, {
        title: '时间',
        key: 'captureTime',
        dataIndex: 'captureTime',
        align: 'center',
        width: 220
    }, {
        title: '白名单',
        key: 'whiteList',
        dataIndex: 'whiteList',
        align: 'center',
        width: 80,
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

const getTopColumns = (): ColumnsType<Hotspot> => {
    return [{
        title: 'APID',
        key: 'apId',
        dataIndex: 'apId',

    },
    // {
    //     title: '强度',
    //     key: 'rssi',
    //     dataIndex: 'rssi',
    //     width: 100,
    //     align: 'center',
    //     render: (value: number) => {
    //         return <Progress
    //             steps={5}
    //             percent={value / 500 * 100}
    //             strokeColor={['#d9f0ef', '#8cd1ce', '#4eb9b3', '#26a9a2', '#038f88']}
    //             showInfo={false} />;
    //         // return value;
    //     }
    // }, 
    {
        title: 'MAC地址',
        key: 'mac',
        dataIndex: 'mac'
    },
    {
        title: '强度值',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 80
    }];
};


export { getColumns, getTopColumns };