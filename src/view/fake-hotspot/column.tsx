import { MouseEvent } from 'react';
import { Button, Tag } from 'antd';
import { ColumnsType } from "antd/es/table";
import { FakeHotspot } from "@/schema/fake-hotspot";
import { NoWarpLabel } from '@/component/panel';

enum ActionType {
    /**
     * 详情
     */
    Detail,
    /**
     * 命中数量
     */
    Count,
    /**
     * 删除
     */
    Del
}

const getColumns = (handle: (actionType: ActionType, record: FakeHotspot) => void): ColumnsType<FakeHotspot> => [
    {
        title: '名称',
        dataIndex: 'hotspotName',
        key: 'hotspotName'
    },
    {
        title: '真实MAC地址',
        dataIndex: 'realMac',
        key: 'realMac',
        render: (val) => <NoWarpLabel width={360} title={val}>{val}</NoWarpLabel>
    },
    {
        title: '命中数量',
        dataIndex: 'count',
        key: 'count',
        width: 100,
        render: (val, record) => <Button
            onClick={(event: MouseEvent<HTMLElement>) => {
                event.preventDefault();
                handle(ActionType.Count, record);
            }}
            type="link">
            {val}
        </Button>
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 120,
        render: (val) => val === 0
            ? <Tag color="green">生效中</Tag>
            : <Tag color="orange">未生效</Tag>
    }, {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        align: 'center',
        width: 220
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        width: 220
    }, {
        title: '详情',
        dataIndex: 'detail',
        key: 'detail',
        align: 'center',
        width: 50,
        render: (_, record) => <Button
            onClick={(event: MouseEvent<HTMLElement>) => {
                event.preventDefault();
                handle(ActionType.Detail, record);
            }}
            type="link"
            size="middle">
            详情
        </Button>
    }, {
        title: '删除',
        dataIndex: 'del',
        key: 'del',
        align: 'center',
        width: 50,
        render: (_, record) => <Button
            onClick={(event: MouseEvent<HTMLElement>) => {
                event.preventDefault();
                handle(ActionType.Del, record);
            }}
            type="link"
            size="middle">
            删除
        </Button>
    }
];

export { ActionType, getColumns };