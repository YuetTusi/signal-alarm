import terminal24 from '@/assets/image/terminal24.png';
import terminal58 from '@/assets/image/terminal58.png';
import round from 'lodash/round';
import { ColumnsType } from 'antd/es/table';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button } from 'antd';
import { Hotspot } from '@/schema/hotspot';
import { Protocol, getProtocolText } from '@/schema/protocol';
import { NoWarpLabel } from '@/component/panel/panel';
import { ActionType } from './prop';

const { Group } = Button;

const getColumns = (handle: (actionType: ActionType, data: Hotspot) => void): ColumnsType<Hotspot> => {
    return [{
        title: '类型',
        key: 'protocolType',
        dataIndex: 'protocolType',
        width: 95,
        align: 'center',
        render: (val: Protocol) => {
            switch (val) {
                case Protocol.WiFi24G:
                    return <img src={terminal24} alt="终端2.4G" width={70} />;
                case Protocol.WiFi58G:
                    return <img src={terminal58} alt="终端5.8G" width={70} />;
                default:
                    return getProtocolText(val);
            }
        }
    }, {
        title: '热点',
        key: 'ssid',
        dataIndex: 'ssid',
        width: 150,
        render(val: string) {
            return <NoWarpLabel title={val} width={140}>{val}</NoWarpLabel>;
        }
    }, {
        title: 'MAC地址',
        key: 'mac',
        dataIndex: 'mac',
        width: 180
    }, {
        title: '强度',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 90,
        render(val) {
            return val + 'dBm';
        }
    }, {
        title: '厂商',
        key: 'org',
        dataIndex: 'org',
        render(val: string) {
            return <NoWarpLabel title={val} width={120}>{val}</NoWarpLabel>;
        }
    }, {
        title: '信道',
        key: 'channel',
        dataIndex: 'channel',
        width: 80
    },
    {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId',
        width: 180,
    }, {
        title: '设备场所',
        key: 'siteName',
        dataIndex: 'siteName',
        // width: 200,
        render(val: string) {
            return <NoWarpLabel title={val} width={100}>{val}</NoWarpLabel>;
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
    }, {
        title: '添加',
        key: 'whiteList',
        dataIndex: 'whiteList',
        align: 'center',
        width: 200,
        fixed: 'right',
        render(_: any, record) {
            return <Group>
                <Button
                    onClick={() => handle(ActionType.AddToWhiteList, record)}
                    type="link"
                    size="middle"
                    style={{ padding: '1px 4px' }}>
                    <PlusOutlined />
                    <span>白名单</span>
                </Button>
                <Button
                    onClick={() => handle(ActionType.AddToFakeHotspot, record)}
                    type="link"
                    size="middle"
                    style={{ padding: '1px 4px' }}>
                    <PlusOutlined />
                    <span>伪热点</span>
                </Button>
            </Group>
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
        width: 80,
        render(val) {
            return val + 'dBm';
        }
    }];
};


export { getColumns, getTopColumns };