import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ComDevice, DeviceState } from '@/schema/com-device';
import { ActionType } from './prop';

type ActionHandle = (action: ActionType, record: ComDevice) => void;

const getColumns = (handle: ActionHandle): ColumnsType<ComDevice> => {
    return [{
        title: '设备名称',
        key: 'deviceName',
        dataIndex: 'deviceName'
    }, {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId'
    }, {
        title: '设备IP',
        key: 'deviceIp',
        dataIndex: 'deviceIp',
        width: 130
    }, {
        title: '场所名称',
        key: 'siteName',
        dataIndex: 'siteName'
    }, {
        title: '设备配置',
        key: 'config',
        dataIndex: 'config'
    }, {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        align: 'center',
        width: 150,
    }, {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        align: 'center',
        width: 150,
    }, {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        width: 50,
        align: 'center',
        render: (val: DeviceState) => {
            switch (val) {
                case DeviceState.Abnormal:
                    return <Tag color="red">异常</Tag>;
                case DeviceState.Normal:
                    return <Tag color="green">工作</Tag>;
                default:
                    return <Tag>未知</Tag>;
            }
        }
    }, {
        title: '配置',
        key: 'id',
        dataIndex: 'id',
        width: 50,
        align: 'center',
        render(_: string, record) {
            return <Button
                onClick={() => handle(ActionType.Set, record)}
                type="link">
                下发
            </Button>
        }
    }, {
        title: '编辑',
        key: 'id',
        dataIndex: 'id',
        width: 50,
        align: 'center',
        render(_: string, record) {
            return <Button
                onClick={() => handle(ActionType.Edit, record)}
                type="link">
                编辑
            </Button>
        }
    }, {
        title: '删除',
        key: 'id',
        dataIndex: 'id',
        width: 50,
        align: 'center',
        render(_: string, record) {
            return <Button
                onClick={() => handle(ActionType.Delete, record)}
                type="link">
                删除
            </Button>
        }
    }];
};

export { getColumns };