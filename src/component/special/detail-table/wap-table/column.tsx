import { ColumnsType } from 'antd/es/table';
import { Wap } from '@/schema/wap';

export const getColumns = (): ColumnsType<Wap> => {
    return [{
        title: '类型',
        key: 'protocolName',
        dataIndex: 'protocolName',
    }, {
        title: '频点',
        key: 'arfcn',
        dataIndex: 'arfcn',
        width: 60
    }, {
        title: '频点信息名称',
        key: 'arfcnName',
        dataIndex: 'arfcnName',
    }, {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId',
    }, {
        title: '设备地址',
        key: 'siteName',
        dataIndex: 'siteName',
    }, {
        title: '强度',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 60
    }, {
        title: '时间',
        key: 'createTime',
        dataIndex: 'createTime',
        align: 'center',
        width: 150
    }];
};