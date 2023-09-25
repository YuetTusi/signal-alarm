import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BaseFreq } from '@/schema/base-freq';

type ActionHandle = (action: any, record: BaseFreq) => void;

/**
 * 背景频谱列头
 */
const getBaseColumns = (handle: ActionHandle): ColumnsType<BaseFreq> => {
    return [{
        title: '频谱名称',
        key: 'baseFreqName',
        dataIndex: 'baseFreqName'
    }, {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId'
    }, {
        title: '描述',
        key: 'description',
        dataIndex: 'description'
    }, {
        title: 'freqArray',
        key: 'freqArray',
        dataIndex: 'freqArray'
    }, {
        title: 'aliasName',
        key: 'aliasName',
        dataIndex: 'aliasName'
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
        width: 150
    }, {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        align: 'center',
        width: 150
    }];
};

export { getBaseColumns };