import { ColumnsType } from 'antd/es/table';
import { Wap } from '@/schema/wap';

const getColumns = (): ColumnsType<Wap> => {
    return [{
        title: '类型',
        key: 'protocolName',
        dataIndex: 'protocolName',
    }, {
        title: 'rssi',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 80
    }, {
        title: 'arfcn',
        key: 'arfcn',
        dataIndex: 'arfcn',
        width: 80
    }, {
        title: 'arfcnName',
        key: 'arfcnName',
        dataIndex: 'arfcnName',
    }];
};

export { getColumns };