import { } from 'react';
import { Button, Descriptions, Modal } from 'antd';
import { NoWarpLabel } from '@/component/panel';
import { CountModalComp } from './prop';

const { Item } = Descriptions;

/**
 * 数量展示
 */
const CountModal: CountModalComp = ({ open, data, onCancel }) => <Modal
    footer={[
        <Button
            onClick={onCancel}
            type="default"
            key="CM_0">取消</Button>
    ]}
    open={open}
    onCancel={onCancel}
    centered={true}
    destroyOnClose={true}
    maskClosable={false}
    width={600}
    title="命中详情">
    <Descriptions
        column={1}
        bordered={true}
        size="small"
        style={{ marginTop: '14px' }}>
        <Item
            label={<NoWarpLabel width={90}>命中数量</NoWarpLabel>}
            labelStyle={{ width: '120px' }}>
            {data?.count ?? '-'}
        </Item>
        <Item
            label={<NoWarpLabel width={90}>伪MAC地址</NoWarpLabel>}>
            {data?.fakeMac ?? '-'}
        </Item>
    </Descriptions>
</Modal>;

export { CountModal };