import { FC, MouseEvent } from 'react';
import { Button, Input, InputNumber, Select, Form, Modal, Col, Row } from 'antd';
import { AddModalProp, FormValue } from './prop';
import { WhiteListType } from '@/schema/white-list';
import { Mac } from '@/utility/regex';

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * 添加白名单
 */
const AddModal: FC<AddModalProp> = ({
    open, onCancel, onOk
}) => {

    const [formRef] = useForm<FormValue>();

    const onSubmit = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { validateFields } = formRef;
        try {
            const values = await validateFields();
            onOk(values);
        } catch (error) {
            console.warn(error);
        }
    };

    const onCancelClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        formRef.resetFields();
        onCancel();
    };

    return <Modal
        footer={[
            <Button onClick={onSubmit} type="primary" key="WLM_0">确定</Button>,
            <Button onClick={onCancelClick} type="default" key="WLM_1">取消</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        width={400}
        getContainer="#app"
        centered={true}
        maskClosable={false}
        destroyOnClose={true}
        title="添加白名单">
        <Form
            form={formRef}
            layout="vertical"
            style={{ marginTop: '2rem' }}>
            <Item
                rules={[
                    { required: true, message: '请选择类型' }
                ]}
                label="类型"
                name="type">
                <Select>
                    <Option value={WhiteListType.MAC}>MAC</Option>
                    <Option value={WhiteListType.Freq}>频段</Option>
                </Select>
            </Item>
            <Item
                rules={[
                    { required: true, message: '请填写MAC地址' },
                    { pattern: Mac, message: 'MAC地址格式有误' }
                ]}
                label="MAC地址"
                name="mac">
                <Input placeholder='形如 6B:18:F4:F1:AE:A4' />
            </Item>
            <Row gutter={24}>
                <Col span={12}>
                    <Item
                        rules={[
                            { required: true, message: '请填写起始频段' }
                        ]}
                        label="起始频段"
                        name="startFreq">
                        <InputNumber style={{ width: '100%' }} />
                    </Item>
                </Col>
                <Col span={12}>
                    <Item
                        rules={[
                            { required: true, message: '请填写结束频段' }
                        ]}
                        label="结束频段"
                        name="endFreq">
                        <InputNumber style={{ width: '100%' }} />
                    </Item>
                </Col>
            </Row>
            <Item
                rules={[
                    { required: true, message: '请选择状态' }
                ]}
                label="状态"
                name="status">
                <Select>
                    <Option value={1}>启用</Option>
                    <Option value={0}>停用</Option>
                </Select>
            </Item>
        </Form>
    </Modal>
};

AddModal.defaultProps = {
    open: false,
    onCancel: () => { },
    onOk: () => { }
};

export { AddModal };