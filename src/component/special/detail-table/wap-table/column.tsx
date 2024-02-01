import { ColumnsType } from 'antd/es/table';
import { Wap } from '@/schema/wap';
import { NoWarpLabel } from '@/component/panel/panel';

export const getColumns = (): ColumnsType<Wap> => {
    return [{
        title: '类型',
        key: 'protocolName',
        dataIndex: 'protocolName',
        width: 200,
        align: 'center'
    }, {
        title: '频点',
        key: 'arfcn',
        dataIndex: 'arfcn',
        width: 80
    }, {
        title: '频点信息名称',
        key: 'arfcnName',
        dataIndex: 'arfcnName',
    }, {
        title: '强度',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 60
    }, {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId'
    }, {
        title: '设备场所',
        key: 'siteName',
        dataIndex: 'siteName',
        width: 280,
        render(val: string) {
            return <NoWarpLabel title={val} width={270}>{val}</NoWarpLabel>;
        }
    }, {
        title: '时间',
        key: 'captureTime',
        dataIndex: 'captureTime',
        align: 'center',
        width: 200
    }];
};