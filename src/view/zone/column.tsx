import { MouseEvent } from 'react';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Zone as ZoneEntity } from '@/schema/zone';
import { ActionType } from './prop';

type ActionHandle = (action: ActionType, record: ZoneEntity) => void;

const getColumns = (handle: ActionHandle): ColumnsType<ZoneEntity> => {
    return [{
        title: '区域名称',
        key: 'areaName',
        dataIndex: 'areaName'
    }, {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        align: 'center',
        width: 170,
    },
    // {
    //     title: '背景',
    //     key: 'id',
    //     dataIndex: 'id',
    //     width: 50,
    //     align: 'center',
    //     render(_: string, record) {
    //         return <Button
    //             onClick={() => handle(ActionType.Preview, record)}
    //             type="link">
    //             背景
    //         </Button>
    //     }
    // },
    {
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