import { FC, MouseEvent, useEffect, useState } from 'react';
import { Button, Input, InputNumber, Select, Form, Modal, Col, Row } from 'antd';
import { WhiteListType } from '@/schema/white-list';
import { Mac } from '@/utility/regex';
import { AddModalProp, FormValue } from './prop';

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * 添加白名单
 */
const AddModal: FC<AddModalProp> = ({
    open, onCancel, onOk
}) => {

    const [formRef] = useForm<FormValue>();
    const [type, setType] = useState<WhiteListType>(WhiteListType.MAC);

    useEffect(() => {
        if (open) {
            const { setFieldsValue, resetFields } = formRef;
            setFieldsValue({ type: WhiteListType.MAC });
        }
    }, [open]);

    /**
     * 类型Change
     */
    const onTypeChange = (value: WhiteListType) => {
        setType(value);
        formRef.resetFields(['mac', 'startFreq', 'endFreq', 'status']);
    };

    const onSubmit = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { validateFields, resetFields } = formRef;
        try {
            const values = await validateFields();
            onOk(values);
            resetFields();
            setType(WhiteListType.MAC);
        } catch (error) {
            console.warn(error);
        }
    };

    const onCancelClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        formRef.resetFields();
        setType(WhiteListType.MAC);
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
                name="type"
                label="类型">
                <Select onChange={onTypeChange}>
                    <Option value={WhiteListType.MAC}>MAC</Option>
                    <Option value={WhiteListType.Freq}>频段</Option>
                </Select>
            </Item>
            <Item
                rules={[
                    { required: type === WhiteListType.MAC, message: '请填写MAC地址' },
                    { pattern: Mac, message: '请填写正确的MAC地址' }
                ]}
                style={{ display: type === WhiteListType.MAC ? 'block' : 'none' }}
                name="mac"
                label="MAC地址">
                <Input placeholder="形如：00:13:EF:F3:07:BC" />
            </Item>
            <Row
                style={{ display: type === WhiteListType.Freq ? 'flex' : 'none' }}
                gutter={24}>
                <Col span={12}>
                    <Item
                        rules={[
                            { required: type === WhiteListType.Freq, message: '请填写起始频段' }
                        ]}
                        label="起始频段"
                        name="startFreq">
                        <InputNumber style={{ width: '100%' }} />
                    </Item>
                </Col>
                <Col span={12}>
                    <Item
                        rules={[
                            { required: type === WhiteListType.Freq, message: '请填写结束频段' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('startFreq') < value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('值需大于起始频段'));
                                }
                            })
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
                    <Option value={0}>生效中</Option>
                    <Option value={1}>未生效</Option>
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