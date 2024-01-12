import { FC } from 'react';
import { Descriptions, Tag } from 'antd';
import { BaseFreq } from '@/schema/base-freq';

const { Item } = Descriptions;

/**
 * 背景频谱详情
 */
const BgDesc: FC<{ data: BaseFreq }> = ({ data }) => <Descriptions
    size="small"
    bordered={true}
    style={{ marginTop: '20px', marginLeft: '-30px' }}>
    <Item label="背景频谱名称" span={3} style={{ width: '150px' }}>
        {data.baseFreqName ?? '-'}
    </Item>
    <Item label="描述" span={3}>
        {data.description ?? '-'}
    </Item>
    <Item label="设备ID" span={3}>
        {data?.deviceId ?? '-'}
    </Item>
    <Item label="创建时间" span={3}>
        {data?.createTime ?? '-'}
    </Item>
    <Item label="状态" span={3}>
        {data?.status === 1 ? <Tag color="green">正常</Tag> : <Tag color="red">停用</Tag>}
    </Item>
</Descriptions>;

export { BgDesc };