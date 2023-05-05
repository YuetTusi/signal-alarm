import { ColumnsType } from 'antd/es/table';
import { Wap } from '@/schema/wap';
import { getProtocolLabel } from '@/schema/protocol';

const getColumns = (): ColumnsType<Wap> => {
    return [
        // {
        //     title: '类型',
        //     key: 'protocolType',
        //     dataIndex: 'protocolType',
        //     render: (val: number) => {
        //         return getProtocolLabel(val);
        //     }
        // },
        {
            title: '设备名称',
            key: 'staName',
            dataIndex: 'staName',
        }, {
            title: '设备ID',
            key: 'deviceId',
            dataIndex: 'deviceId',
        }, {
            title: '设备地址',
            key: 'siteName',
            dataIndex: 'siteName',
        }, {
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
            title: '强度值',
            key: 'rssi',
            dataIndex: 'rssi',
            width: 60
        }, {
            title: '时间',
            key: 'updateTime',
            dataIndex: 'updateTime',
            align: 'center',
            width: 150
        }];
};

const getTopColumns = (): ColumnsType<Wap> => {
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
        title: '设备地址',
        key: 'siteName',
        dataIndex: 'siteName'
    },
    {
        title: '强度值',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 80
    },
    ];
};


export { getColumns, getTopColumns };