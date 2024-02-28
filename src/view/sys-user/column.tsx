import { MouseEvent } from 'react';
import { ColumnsType } from "antd/es/table";
import { SystemUser } from '@/schema/system-user';
import { Tag } from "antd";
import { ColumnAction } from './prop';

const getColumns = (columnClick: (type: ColumnAction, data: SystemUser) => void): ColumnsType<SystemUser> => {

    return [
        {
            title: '用户名',
            key: 'username',
            dataIndex: 'username'
        }, {
            title: '姓名',
            key: 'name',
            dataIndex: 'name'
        }, {
            title: '手机',
            key: 'phone',
            dataIndex: 'phone',
            width: 140
        }, {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            width: 60,
            render: (val: number) => {
                switch (val) {
                    case 0:
                        return <Tag color="red">停用</Tag>;
                    case 1:
                        return <Tag color="green">正常</Tag>;
                    default:
                        return <Tag>未知</Tag>;
                }
            }
        }, {
            title: '更新时间',
            key: 'updateTime',
            dataIndex: 'updateTime',
            align: 'center',
            width: 210
        }, {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            align: 'center',
            width: 210
        }, {
            title: '修改密码',
            key: 'modifyPassword',
            dataIndex: 'modifyPassword',
            align: 'center',
            width: 100,
            render(_: any, record) {
                return <a onClick={(event: MouseEvent) => {
                    event.preventDefault();
                    columnClick(ColumnAction.ModifyPassword, record);
                }}>修改密码</a>
            }
        }, {
            title: '修改状态',
            key: 'modifyStatus',
            dataIndex: 'modifyStatus',
            align: 'center',
            width: 100,
            render(_: any, record) {
                return <a onClick={(event: MouseEvent) => {
                    event.preventDefault();
                    columnClick(ColumnAction.ModifyStatus, record);
                }}>修改状态</a>
            }
        }, {
            title: '详情',
            key: 'detail',
            dataIndex: 'detail',
            align: 'center',
            width: 60,
            render(_: any, record) {
                return <a onClick={(event: MouseEvent) => {
                    event.preventDefault();
                    columnClick(ColumnAction.Detail, record);
                }}>详情</a>
            }
        }, {
            title: '编辑',
            key: 'edit',
            dataIndex: 'edit',
            align: 'center',
            width: 60,
            render(_: any, record) {
                return <a onClick={(event: MouseEvent) => {
                    event.preventDefault();
                    columnClick(ColumnAction.Edit, record);
                }}>编辑</a>
            }
        }
    ];
};

export { getColumns };