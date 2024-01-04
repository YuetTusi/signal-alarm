import { Tag } from 'antd';
import { ColumnsType } from "antd/es/table";
import { FakeHotspot } from "@/schema/fake-hotspot";
import { NoWarpLabel } from '@/component/panel';

enum ActionType {
    Add
}

const getColumns = (handle: (actionType: ActionType, record: FakeHotspot) => void): ColumnsType<FakeHotspot> => [
    {
        title: '名称',
        dataIndex: 'hotspotName',
        key: 'hotspotName'
    },
    {
        title: '伪MAC地址',
        dataIndex: 'fakeMac',
        key: 'fakeMac',
        render: (val) => <NoWarpLabel width={360} title={val}>{val}</NoWarpLabel>
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
        width: 90
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
        width: 170
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        width: 170
    }
];

export { getColumns };