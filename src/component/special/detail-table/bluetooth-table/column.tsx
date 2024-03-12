import { Tag } from 'antd';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { ColumnsType } from 'antd/es/table';
import { Button } from 'antd';
import { NoWarpLabel } from '@/component/panel/panel';
import { Bluetooth } from '@/schema/bluetooth';
import { ActionType } from './prop';

const getColumns = (handle: (actionType: ActionType, data: Bluetooth) => void): ColumnsType<Bluetooth> => {
    return [{
        title: '蓝牙类型',
        key: 'type',
        dataIndex: 'type',
        width: 140,
        align: 'center',
        render: (val: 'ble' | 'classic') => val === 'ble' ? '低功耗蓝牙' : '经典蓝牙'
    },
    {
        title: 'MAC地址',
        key: 'mac',
        dataIndex: 'mac',
        width: 140
    },
    {
        title: '强度',
        key: 'signal',
        dataIndex: 'signal',
        width: 60
    },
    {
        title: '连接状态',
        key: 'isConnect',
        dataIndex: 'isConnect',
        align: 'center',
        width: 110,
        render: (val: number) => val === 0
            ? <Tag color="orange" style={{ marginRight: 0 }}>未连接</Tag>
            : <Tag color="green" style={{ marginRight: 0 }}>已连接</Tag>
    }, {
        title: '厂商',
        key: 'vendor',
        dataIndex: 'vendor',
        width: 160,
        render(val: string) {
            return <NoWarpLabel title={val} width={150}>{val}</NoWarpLabel>;
        }
    }, {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId'
    },
    {
        title: '设备类型',
        key: 'devType',
        dataIndex: 'devType'
    }, {
        title: '设备名称',
        key: 'name',
        dataIndex: 'name'
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
        width: 230
    }, {
        title: '白名单',
        key: 'whiteList',
        dataIndex: 'whiteList',
        align: 'center',
        width: 90,
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

export { getColumns };