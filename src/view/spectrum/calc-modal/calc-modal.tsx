import dayjs from 'dayjs';
import { FC, MouseEvent, useEffect } from 'react';
import {
    Button, DatePicker, Input, Select, Form, Modal, Col, Row
} from 'antd';
import { useModel } from '@/model';
import { toSelectData } from '../tool';
import { CalcModalProp, FormValue } from './prop';

const { useForm, Item } = Form;

/**
 * 计算背景频谱弹窗
 */
const CalcModal: FC<CalcModalProp> = ({ open, onCancel, onOk }) => {

    const [formRef] = useForm<FormValue>();
    const {
        baseSpectrumDeviceList
    } = useModel(state => ({
        baseSpectrumDeviceList: state.baseSpectrumDeviceList,
    }));

    useEffect(() => {
        const { setFieldValue } = formRef;
        if (open) {
            setFieldValue('createTimeBegin', dayjs(dayjs().add(-30, 'minute').format('YYYY-MM-DD HH:mm:ss')));
            setFieldValue('createTimeEnd', dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss')));
        }
    }, [open]);

    const onOkClick = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { validateFields, resetFields } = formRef;
        try {
            const values = await validateFields();
            onOk(values);
            resetFields();
        } catch (error) {
            console.warn(error);
        }
    };

    const onCancelClick = () => {
        formRef.resetFields();
        onCancel();
    };

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="CM_0">取消</Button>,
            <Button onClick={onOkClick} type="primary" key="CM_1">确定</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        centered={true}
        maskClosable={false}
        destroyOnHidden={true}
        forceRender={true}
        width={640}
        getContainer="#app"
        title="计算背景频谱">
        <Form form={formRef} layout="vertical" style={{ marginTop: '2rem' }}>
            <Item
                name="baseFreqName"
                label="背景频谱名称"
                rules={[
                    { required: true, message: '请填写背景频谱名称' }
                ]}>
                <Input />
            </Item>
            <Item
                name="deviceId"
                label="设备"
                rules={[
                    { required: true, message: '请选择设备' }
                ]}>
                <Select
                    options={[
                        ...toSelectData(baseSpectrumDeviceList, false)
                    ]}
                    filterOption={
                        (val: string, option: any) =>
                            (option?.label ?? '').includes(val)
                    }
                    showSearch={true} />
            </Item>
            <Row gutter={24}>
                <Col span={12}>
                    <Item
                        name="createTimeBegin"
                        label="起始时间"
                        rules={[
                            { required: true, message: '请选择起始时间' }
                        ]}>
                        <DatePicker
                            showTime={true}
                            allowClear={false}
                            style={{ width: '100%' }} />
                    </Item>
                </Col>
                <Col span={12}>
                    <Item
                        name="createTimeEnd"
                        label="结束时间"
                        rules={[
                            { required: true, message: '请选择结束时间' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const minute = value.diff(getFieldValue('createTimeBegin'), 'minute');
                                    if (minute < 0) {
                                        return Promise.reject(new Error('请大于起始时间'));
                                    } else if (minute > 60) {
                                        return Promise.reject(new Error('时间范围在1小时之内'));
                                    } else {
                                        return Promise.resolve();
                                    }
                                }
                            })
                        ]}>
                        <DatePicker
                            showTime={true}
                            allowClear={false}
                            style={{ width: '100%' }} />
                    </Item>
                </Col>
            </Row>
            <Item
                name="description"
                label="描述">
                <Input />
            </Item>
        </Form>
    </Modal>
};


export { CalcModal };