import { FC } from 'react';
import { Button, Form, Input, Select } from 'antd';
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

    return <Form
        form={formRef}
        layout="horizontal"
        {...formLayout}>
        <Item
            rules={[
                { required: true, message: '请填写设备ID' },
                () => ({
                    validator(_, value) {
                        if (!helper.isNullOrUndefined(value)) {
                            return deviceIdExist(value);
                        } else {
                            return Promise.resolve();
                        }
                    },
                }),
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