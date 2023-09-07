import { FC, MouseEvent } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { AlarmMsg } from '@/schema/alarm-msg';
import { SelectedPanel } from './styled/style';
import { BatchModalProp } from './prop';

const { Item, useForm } = Form;

/**
 * 批量处理框
 */
const BatchModal: FC<BatchModalProp> = ({ open, data, onOk, onCancel }) => {

    const [formRef] = useForm<{ remark: string }>();

    const onOkClick = (event: MouseEvent) => {
        event.preventDefault();
        const values = formRef.getFieldsValue();
        onOk(data, values.remark);
        formRef.resetFields();
    };

    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        formRef.resetFields();
        onCancel();
    };

    const renderList = (data: AlarmMsg[]) =>
        data.map((item, index) => <li key={`BA_${index}`}>
            <label>类型：</label>
            <span>{item.protocol}</span>
            <label>设备场所：</label>
            <span>{item.siteName}</span>
            <strong>（{item?.captureTime ?? ''}）</strong>
        </li>);

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="BM_0">取消</Button>,
            <Button onClick={onOkClick} type="primary" key="BM_1">确定</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        title="批量处理"
        getContainer="#app"
        centered={true}
        destroyOnClose={true}
        maskClosable={false}
        width={640}
    >
        <SelectedPanel>
            <div className="caption">所选摘要</div>
            <div className="content">
                <ul>{renderList(data)}</ul>
            </div>
        </SelectedPanel>
        <Form form={formRef} layout="vertical">
            <Item name="remark" label="处理记录">
                <Input placeholder="请填写本次处理记录" />
            </Item>
        </Form>
    </Modal>
};

export { BatchModal };