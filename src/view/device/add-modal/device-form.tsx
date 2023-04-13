import { FC } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { IP } from '@/utility/regex';
import { DeviceFormProp } from './prop';

const { Item } = Form;
const { Option } = Select;
const formLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

/**
 * 表单
 * @returns 
 */
const DeviceForm: FC<DeviceFormProp> = ({ data, formRef }) => {

    return <Form
        form={formRef}
        layout="horizontal"
        {...formLayout}>
        <Item
            rules={[
                { required: true, message: '请填写设备ID' }
            ]}
            initialValue={data?.deviceId}
            name="deviceId"
            label="设备ID">
            <Input />
        </Item>
        <Item
            rules={[
                { required: true, message: '请填写设备IP' },
                { pattern: IP, message: '请填写合法IP地址' }
            ]}
            initialValue={data?.deviceIp}
            name="deviceIp"
            label="设备IP">
            <Input />
        </Item>
        <Item
            rules={[
                { required: true, message: '请填写设备名称' }
            ]}
            initialValue={data?.deviceName}
            name="deviceName"
            label="设备名称">
            <Input />
        </Item>
        <Item
            rules={[
                { required: true, message: '请填写场所名称' }
            ]}
            initialValue={data?.siteName}
            name="siteName"
            label="场所名称">
            <Input />
        </Item>
        <Item
            rules={[
                { required: true, message: '请选择状态' }
            ]}
            initialValue={data?.status ?? 1}
            name="status"
            label="状态">
            <Select>
                <Option value={1}>工作</Option>
                <Option value={0}>异常</Option>
            </Select>
        </Item>
    </Form>
};

export { DeviceForm };