import { Descriptions, Modal } from 'antd';
import { NoWarpLabel } from '@/component/panel';
import { CountModalComp } from './prop';

const { Item } = Descriptions;

/**
 * 数量展示
 */
const CountModal: CountModalComp = ({ open, data, onCancel }) => <Modal
    footer={null}
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
            label={<NoWarpLabel width={120}>命中数量</NoWarpLabel>}
            labelStyle={{ width: '150px' }}>
            {data?.count ?? '-'}
        </Item>
        <Item
            label={<NoWarpLabel width={120}>伪MAC地址</NoWarpLabel>}>
            {data?.fakeMac ?? '-'}
        </Item>
    </Descriptions>
</Modal>;

export { CountModal };