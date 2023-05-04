import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AlarmMsg } from '@/schema/alarm-msg';
import { ActionType } from './prop';

type ActionHandle = (action: ActionType, record: AlarmMsg) => void;

const getColumns = (): ColumnsType<AlarmMsg> => {
    return [{
        title: '类型',
        key: 'protocol',
        dataIndex: 'protocol'
    }, {
        title: '告警级别',
        key: 'warnLevel',
        dataIndex: 'warnLevel',
        width: 75
    }, {
        title: '告警原因',
        key: 'warnReason',
        dataIndex: 'warnReason',
    }, {
        title: '频点信息名称',
        key: 'arfcn',
        dataIndex: 'arfcn'
    }, {
        title: '强度值',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 60
    }, {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        width: 50,
        align: 'center',
        render: (val: number) => {
            switch (val) {
                case 0:
                    return <Tag color="orange">待处理</Tag>;
                case 1:
                    return <Tag color="green">已处理</Tag>;
                default:
                    return <Tag>未知</Tag>;
            }
        }
    }, {
        title: '处理记录',
        key: 'remark',
        dataIndex: 'remark'
    }, {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId'
    }, {
        title: '设备地址',
        key: 'siteName',
        dataIndex: 'siteName'
    }, {
        title: '时间',
        key: 'createTime',
        dataIndex: 'createTime',
        align: 'center',
        width: 150,
    }];
};

const getTopColumns = (handle: ActionHandle): ColumnsType<AlarmMsg> => {
    return [{
        title: '类型',
        key: 'protocol',
        dataIndex: 'protocol'
    }, {
        title: '告警级别',
        key: 'warnLevel',
        dataIndex: 'warnLevel',
        width: 75
    }, {
        title: '告警原因',
        key: 'warnReason',
        dataIndex: 'warnReason',
    }, {
        title: '设备地址',
        key: 'siteName',
        dataIndex: 'siteName'
    },
    {
        title: '时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        align: 'center',
        width: 150,
    }, {
        title: '处理',
        key: 'read',
        dataIndex: 'read',
        align: 'center',
        width: 50,
        render: (val: any, record) => {
            return <a onClick={() => {
                handle(ActionType.Process, record);
            }}>处理</a>;
        }
    }, {
        title: '详情',
        key: 'detail',
        dataIndex: 'detail',
        align: 'center',
        width: 50,
        render: (val: any, record) => {
            return <a onClick={() => {
                handle(ActionType.Detail, record);
            }}>详情</a>;
        }
    }];
};


export { getColumns, getTopColumns };