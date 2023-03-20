import { ColumnsType } from 'antd/es/table';
import { Wap } from '@/schema/wap';

const getColumns = (): ColumnsType<Wap> => {
    return [{
        title: '类型',
        key: 'protocolName',
        dataIndex: 'protocolName',
    }, {
        title: '强度',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 80
    }, {
        title: '频点',
        key: 'arfcn',
        dataIndex: 'arfcn',
        width: 80
    }, {
        title: '频点信息名称',
        key: 'arfcnName',
        dataIndex: 'arfcnName',
    }];
};

export { getColumns };