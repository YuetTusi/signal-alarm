import { Progress } from 'antd';
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
        width: 60
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
    }];
};

const getTopColumns = (): ColumnsType<Wap> => {
    return [{
        title: '类型',
        key: 'protocolName',
        dataIndex: 'protocolName',
    }, {
        title: '强度',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 100,
        align: 'center',
        render: (value: number) => {
            return <Progress
                steps={5}
                percent={value / 500 * 100}
                strokeColor={['#d9f0ef', '#8cd1ce', '#4eb9b3', '#26a9a2', '#038f88']}
                showInfo={false} />;
            // return value;
        }
    }, {
        title: '强度值',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 80
    },
        // {
        //     title: '频点',
        //     key: 'arfcn',
        //     dataIndex: 'arfcn',
        //     width: 80
        // }, {
        //     title: '频点信息名称',
        //     key: 'arfcnName',
        //     dataIndex: 'arfcnName'
        // }
    ];
};


export { getColumns, getTopColumns };