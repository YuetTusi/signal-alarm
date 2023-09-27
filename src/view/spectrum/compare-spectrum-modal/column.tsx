import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BaseFreq } from '@/schema/base-freq';

/**
 * 背景频谱列头
 */
const getColumns = (): ColumnsType<BaseFreq> => {
    return [{
        title: '背景频谱名称',
        key: 'baseFreqName',
        dataIndex: 'baseFreqName'
    },
    // {
    //     title: '设备ID',
    //     key: 'deviceId',
    //     dataIndex: 'deviceId'
    // }, 
    {
        title: '描述',
        key: 'description',
        dataIndex: 'description'
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
    }];
};

export { getColumns };