import { FC, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { IP } from '@/utility/regex';
import { ComDevice } from '@/schema/com-device';
import { request } from '@/utility/http';
import { helper } from '@/utility/helper';
import { DeviceFormProp } from './prop';

const { Item } = Form;
const { Option } = Select;
const formLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

/**
 * 验证设备id是否存在
 * @param deviceId 设备id
 * @param id 主键
 */
const deviceIdExist = async (deviceId: string, id?: number) => {
    let list: ComDevice[] = [];
    try {
        const res = await request
            .get<{ records: ComDevice[] }>('/devops/device/1/1000000000000000000');
        if (res !== null && res.code === 200) {
            list = res.data.records;
        }
        if (helper.isNullOrUndefined(id)) {
            //添加
            const exist = list.some(item => item?.deviceId === deviceId);
            return exist
                ? Promise.reject(new Error('设备ID已存在'))
                : Promise.resolve('设备id不存在');
        } else {
            //编辑
            const exist = list
                .filter(item => item?.id !== id)
                .some(item => item?.deviceId === deviceId);
            return exist
                ? Promise.reject(new Error('设备ID已存在'))
                : Promise.resolve('设备id不存在');
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * 表单
 * @returns 
 */
const DeviceForm: FC<DeviceFormProp> = ({ data, formRef }) => {

    const { setFieldValue, setFieldsValue } = formRef;

    useEffect(() => {
        if (data) {
            setFieldsValue(data);
        } else {
            setFieldValue('status', 1);
        }
    }, [data]);

    return <Form
        form={formRef}
        preserve={false}
        layout="horizontal"
        {...formLayout}>
        <Item
            rules={[
                { required: true, message: '请填写设备ID' },
                { pattern: /^[a-zA-Z0-9-_]+$/, message: '数字，英文' },
                () => ({
                    validator(_, value) {
                        if (!helper.isNullOrUndefined(value)) {
                            return deviceIdExist(value, data?.id);
                        } else {
                            return Promise.resolve();
                        }
                    },
                }),
            ]}
            name="deviceId"
            label="设备ID">
            <Input placeholder="数字，英文，下划线；不可重复" disabled={data !== undefined} />
        </Item>
        <Item
            rules={[
                { required: true, message: '请填写设备IP' },
                { pattern: IP, message: '请填写合法IP地址' }
            ]}
            name="deviceIp"
            label="设备IP">
            <Input placeholder="IP地址，如127.0.0.1" />
        </Item>
        <Item
            rules={[
                { required: true, message: '请填写设备名称' }
            ]}
            name="deviceName"
            label="设备名称">
            <Input />
        </Item>
        <Item
            rules={[
                { required: true, message: '请填写场所名称' }
            ]}
            name="siteName"
            label="场所名称">
            <Input />
        </Item>
        <Item
            rules={[
                { required: true, message: '请选择状态' }
            ]}
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