import { ColumnsType } from 'antd/es/table';
import { Terminal } from '@/schema/terminal';

const getColumns = (): ColumnsType<Terminal> => {
    return [
        {
            title: '设备ID',
            key: 'deviceId',
            dataIndex: 'deviceId',
        }, {
            title: '设备地址',
            key: 'siteName',
            dataIndex: 'siteName',
        },
        {
            title: 'ssid',
            key: 'ssid',
            dataIndex: 'ssid'
        },
        {
            title: 'apMac',
            key: 'apMac',
            dataIndex: 'apMac'
        },
        {
            title: 'MAC地址',
            key: 'mac',
            dataIndex: 'mac'
        },
        {
            title: '强度值',
            key: 'rssi',
            dataIndex: 'rssi',
            width: 60
        }, {
            title: '时间',
            key: 'captureTime',
            dataIndex: 'captureTime',
            align: 'center',
            width: 150
        }];
};

export { getColumns };