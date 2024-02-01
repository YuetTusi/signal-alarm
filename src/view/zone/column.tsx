import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Zone as ZoneEntity } from '@/schema/zone';
import { ActionType } from './prop';

type ActionHandle = (action: ActionType, record: ZoneEntity) => void;

const getColumns = (handle: ActionHandle): ColumnsType<ZoneEntity> => [
    {
        title: '区域名称',
        key: 'areaName',
        dataIndex: 'areaName'
    }, {
        title: '区域宽度',
        key: 'areaWidth',
        dataIndex: 'areaWidth',
        width: 120
    }, {
        title: '区域高度',
        key: 'areaHeight',
        dataIndex: 'areaHeight',
        width: 120
    }, {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        align: 'center',
        width: 210,
    },
    {
        title: '编辑',
        key: 'id',
        dataIndex: 'id',
        width: 50,
        align: 'center',
        render(_: string, record) {
            return <Button
                onClick={() => handle(ActionType.Edit, record)}
                type="link"
                size="small">
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
                type="link"
                size="small">
                删除
            </Button>
        }
    }
];

export { getColumns };