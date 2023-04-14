import { FC, MouseEvent, useEffect } from 'react';
import { Button, Modal, Form, Input, Descriptions, Tag } from 'antd';
import { DeviceState } from '@/schema/com-device';
import { DescBox } from './styled/box';
import { SetFormValue, SetModalProp } from './prop';

const { Item, useForm } = Form;

/**
 * 下发
 */
const SetModal: FC<SetModalProp> = ({
    open, data, onCancel, onOk
}) => {

    useEffect(() => {
        const { resetFields } = formRef;
        if (open) {
            resetFields();
        }
    }, [open]);

    const [formRef] = useForm<SetFormValue>();

    const onOkClick = async (event: MouseEvent) => {
        event.preventDefault();
        const { validateFields } = formRef;
        try {
            const values = await validateFields();
            onOk(values);

        } catch (error) {
            console.warn(error);
        }
    };

    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        onCancel();
    };

    const renderDesc = () => <DescBox>
        <Descriptions
            bordered={true}
            size="small"
            style={{ marginTop: '20px' }}>
            <Descriptions.Item label="设备ID" span={3}>{data?.deviceId ?? ''}</Descriptions.Item>
            <Descriptions.Item label="设备IP" span={3}>{data?.deviceIp ?? ''}</Descriptions.Item>
            <Descriptions.Item label="设备名称" span={3}>{data?.deviceName ?? ''}</Descriptions.Item>
            <Descriptions.Item label="场所名称" span={3}>{data?.siteName ?? ''}</Descriptions.Item>
            <Descriptions.Item label="设备配置" span={3}>{data?.config ?? ''}</Descriptions.Item>
            <Descriptions.Item label="状态" span={3}>
                {
                    data?.status === DeviceState.Normal
                        ? <Tag color="green">工作</Tag>
                        : <Tag color="red">异常</Tag>
                }
            </Descriptions.Item>
        </Descriptions>
    </DescBox>;

    return <Modal
        footer={[
            <Button
                onClick={onCancelClick}
                type="default"
                key="SM_0">
                取消
            </Button>,
            <Button
                onClick={onOkClick}
                type="primary"
                key="SM_1">
                确定
            </Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        title="配置下发"
        getContainer="#app"
        forceRender={true}
        destroyOnClose={true}
        maskClosable={false}
        centered={true}>
        {renderDesc()}
        <Form form={formRef} layout="vertical">
            <Item
                rules={[{ required: true, message: '请填写配置' }]}
                name="su"
                label="配置">
                <Input />
            </Item>
        </Form>
    </Modal>
};

export { SetModal };