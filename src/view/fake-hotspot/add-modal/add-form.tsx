import { FC } from 'react';
import { Form, Input, Select } from 'antd';
import { Mac } from '@/utility/regex';
import { AddFormProp } from './prop';

const { Option } = Select;
const { Item } = Form;

const AddForm: FC<AddFormProp> = ({
    formRef
}) => <Form
    form={formRef}
    layout="vertical"
    style={{ marginTop: '20px' }}>
        <Item
            rules={[
                { required: true, message: '请填写名称' }
            ]}
            name="hotspotName"
            label="名称">
            <Input />
        </Item>
        {/* <Item
            rules={[
                { required: true, message: '请填写伪MAC地址' },
                { pattern: Mac, message: '请填写正确的MAC地址' }
            ]}
            name="fakeMac"
            label="伪MAC地址">
            <Input placeholder="形如：00:13:EF:F3:07:BC" />
        </Item> */}
        <Item
            rules={[
                { required: true, message: '请填写真实MAC地址' },
                { pattern: Mac, message: '请填写正确的MAC地址' }
            ]}
            name="realMac"
            label="真实MAC地址">
            <Input placeholder="形如：00:13:EF:F3:07:BC" />
        </Item>
        <Item
            rules={[
                { required: true, message: '请填选择状态' }
            ]}
            name="status"
            label="状态">
            <Select>
                <Option value={0}>已生效</Option>
                <Option value={1}>未生效</Option>
            </Select>
        </Item>
    </Form>;
export { AddForm };