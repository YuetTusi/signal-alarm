import { FC } from 'react';
import { Button, Descriptions, Modal, Tag } from 'antd';
import { DetailModalProp } from './prop';

const { Item } = Descriptions;

/**
 * 详情框
 */
const DetailModal: FC<DetailModalProp> = ({ open, data, onCancel }) => {


    return <Modal
        footer={[
            <Button
                onClick={onCancel}
                type="default"
                key="UDM_0">取消</Button>
        ]}
        open={open}
        onCancel={onCancel}
        title="用户详情"
        getContainer="#app"
        width={600}
        centered={true}
        maskClosable={false}
        destroyOnClose={false}>
        <Descriptions
            bordered={true}
            size="middle"
            style={{ marginTop: '20px' }}>
            <Item label="ID" span={3}>{data?.id}</Item>
            <Item label="用户名" span={3}>{data?.username ?? '-'}</Item>
            <Item label="姓名" span={3}>{data?.name ?? '-'}</Item>
            <Item label="手机" span={3}>{data?.phone ?? '-'}</Item>
            <Item label="岗位" span={3}>{data?.postName ?? '-'}</Item>
            <Item label="描述" span={3}>{data?.description ?? '-'}</Item>
            <Item label="更新时间" span={3}>{data?.updateTime ?? '-'}</Item>
            <Item label="创建时间" span={3}>{data?.createTime ?? '-'}</Item>
            <Item
                label="状态"
                span={3}>
                {
                    data?.status === 0
                        ? <Tag color="red">停用</Tag>
                        : <Tag color="green">正常</Tag>
                }
            </Item>
        </Descriptions>
    </Modal>
};

export { DetailModal };