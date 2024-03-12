import { ColumnsType } from 'antd/es/table';
import { Wap } from '@/schema/wap';
import { getProtocolText } from '@/schema/protocol';
import { NoWarpLabel } from '@/component/panel/panel';

const getColumns = (): ColumnsType<Wap> => {
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
        width: 90
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
        width: 230
    }];
};

const getTopColumns = (): ColumnsType<Wap> => {
    return [{
        title: '类型',
        key: 'protocolType',
        dataIndex: 'protocolType',
        render: (val: number) => getProtocolText(val)
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
    },
    ];
};


export { getColumns, getTopColumns };