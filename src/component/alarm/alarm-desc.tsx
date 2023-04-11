import { FC } from 'react';
import { Descriptions, Tag } from 'antd';
import { AlarmMsg } from '@/schema/alarm-msg';

const { Item } = Descriptions;

/**
 * 预警信息单条详情
 */
const AlarmDesc: FC<{ data: AlarmMsg }> = ({ data }) => {

    return <Descriptions bordered={true} size="small" style={{ marginTop: '20px' }}>
        <Item label="类型" span={3}>{data?.protocol}</Item>
        <Item label="告警原因" span={3}>{data?.warnReason ?? '---'}</Item>
        <Item label="告警级别" span={3}>{data?.warnLevel ?? '---'}</Item>
        <Item label="点信息名称" span={3}>{data?.arfcn ?? '---'}</Item>
        <Item label="强度值" span={3}>{data?.rssi ?? '---'}</Item>
        <Item label="设备ID" span={3}>{data?.deviceId ?? '---'}</Item>
        <Item label="设备地址" span={3}>{data?.siteName ?? '---'}</Item>
        <Item label="时间" span={3}>{data?.createTime ?? '---'}</Item>
        <Item label="状态" span={3}>{data?.status === 0 ? <Tag color="orange">待处理</Tag> : <Tag color="green">已处理</Tag>}</Item>
        <Item label="处理记录" span={3}>{data?.remark ?? '---'}</Item>
    </Descriptions>
};

export { AlarmDesc };