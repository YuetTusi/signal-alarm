import { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import { WhiteList, WhiteListType } from '@/schema/white-list';

enum ActionType {
    /**
     * 删除
     */
    Delete
}

const getColumns = (handle: (actionType: ActionType, record: WhiteList) => void): ColumnsType<WhiteList> => [
    {
        title: '名称',
        key: 'ruleName',
        dataIndex: 'ruleName'
    },
    {
        title: '数据',
        key: 'ruleData',
        dataIndex: 'ruleData'
    },
    {
        title: '类型',
        key: 'ruleType',
        dataIndex: 'ruleType',
        width: 80,
        align: 'center',
        render(value: WhiteListType) {
            switch (value) {
                case WhiteListType.MAC:
                    return 'MAC';
                case WhiteListType.Freq:
                    return '频段';
                default:
                    return '-';
            }
        }
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        width: 80,
        align: 'center',
        render(value) {
            switch (value) {
                case 0:
                    return <Tag color="green">生效中</Tag>;
                case 1:
                    return <Tag color="orange">未生效</Tag>;
                default:
                    return '';
            }
        }
    },
    {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        width: 180,
        align: 'center',
    },
    {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        width: 220,
        align: 'center',
    },
    {
        title: '删除',
        key: 'delete',
        dataIndex: 'delete',
        width: 60,
        align: 'center',
        render(_: any, record) {
            return <a
                onClick={() => {
                    handle(ActionType.Delete, record);
                }}
            >删除</a>
        }
    }
];

export { getColumns, ActionType };