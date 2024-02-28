import { FC, useEffect } from 'react';
import { Col, Row, Button, Select, Input, Form, Modal } from 'antd';
import { useModel } from '@/model';
import { request } from '@/utility/http';
import { Num } from '@/utility/regex';
import { SystemRole } from '@/schema/system-role';
import { SystemUser } from '@/schema/system-user';
import { EditModalProp } from './prop';
import { QueryPage } from '@/schema/query-page';


const { useForm, Item } = Form;
// const { Password } = Input;
const { Option } = Select;

const renderRoleOptions = (roles: SystemRole[]) => roles
    .map((item, index) => <Option
        value={item.id}
        key={`UEMS_${index}`}>
        {item.roleName}
    </Option>);

/**
 * 编辑框
 */
const EditModal: FC<EditModalProp> = ({ open, data, onCancel, onOk }) => {

    const [formRef] = useForm<SystemUser>();

    const {
        sysRoleList
    } = useModel(state => ({
        sysRoleList: state.sysRoleList
    }));

    useEffect(() => {
        console.log(data);
        if (data) {
            formRef.setFieldsValue(data);
        }
    }, [data]);

    useEffect(() => {
        if (!open) {
            formRef.resetFields();
        }
    }, [open]);

    /**
     * 表单Submit
     */
    const onSubmit = async () => {
        const { validateFields } = formRef;
        try {
            const values = await validateFields();
            onOk(values);
        } catch (error) {
            console.warn(error);
        }
    };

    return <Modal
        footer={[
            <Button
                onClick={() => {
                    formRef.resetFields();
                    onCancel();
                }}
                type="default"
                key="EUM_0">取消</Button>,
            <Button
                onClick={() => onSubmit()}
                type="primary"
                key="EUM_1">确定</Button>
        ]}
        open={open}
        onCancel={() => {
            formRef.resetFields();
            onCancel();
        }}
        title={data === undefined ? '添加用户' : '编辑用户'}
        getContainer="#app"
        width={650}
        centered={true}
        maskClosable={false}
        destroyOnClose={false}>

        <Form
            form={formRef}
            layout="vertical"
            style={{ marginTop: '20px', marginBottom: '40px' }}>
            <Row gutter={16}>
                <Col span={12}>
                    <Item
                        rules={[
                            { required: true, message: '请填写用户名' },
                            ({ }) => ({
                                async validator(_, value) {

                                    if (data === undefined) {
                                        if (value === undefined || value === '') {
                                            return Promise.resolve();
                                        }

                                        try {
                                            const res = await request
                                                .get<QueryPage<SystemUser>>('/system/sysUser/1/10000000');
                                            if (res !== null && res.code === 200) {
                                                const exist = (res.data?.records ?? []).some(item => item.username === value);
                                                if (exist) {
                                                    return Promise.reject(new Error('用户名已存在'));
                                                } else {
                                                    return Promise.resolve();
                                                }
                                            } else {
                                                return Promise.resolve();
                                            }
                                        } catch (error) {
                                            return Promise.resolve();
                                        }
                                    } else {
                                        return Promise.resolve();
                                    }
                                }
                            })
                        ]}
                        hasFeedback={true}
                        validateDebounce={500}
                        label="用户名"
                        name="username">
                        <Input disabled={data !== undefined} />
                    </Item>
                </Col>
                <Col span={12}>
                    <Item label="姓名" name="name">
                        <Input />
                    </Item>
                </Col>
            </Row>
            {/* <Row gutter={16}>
                <Col span={12}>
                    <Item
                        rules={[
                            { required: true, message: '请填写密码' }
                        ]}
                        label="密码"
                        name="password">
                        <Password />
                    </Item>
                </Col>
                <Col span={12}>
                    <Item
                        rules={[
                            { required: true, message: '请填写密码' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('重复密码与密码不一致'));
                                }
                            })
                        ]}
                        label="重复密码"
                        name="rePassword">
                        <Password placeholder="请与密码输入一致" />
                    </Item>
                </Col>
            </Row> */}
            <Row gutter={16}>
                <Col span={12}>
                    <Item
                        rules={[
                            { pattern: Num, message: '请输入数字' }
                        ]}
                        label="手机"
                        name="phone">
                        <Input />
                    </Item>
                </Col>
                <Col span={12}>
                    <Item
                        rules={[
                            { required: true, message: '请选择角色' }
                        ]}
                        label="角色"
                        name="roleList">
                        <Select
                            mode="multiple"
                            maxTagCount={1}
                            maxTagTextLength={5}
                            style={{ width: '100%' }}>
                            {renderRoleOptions(sysRoleList)}
                        </Select>
                    </Item>
                </Col>
            </Row>
            <Item label="描述" name="description">
                <Input />
            </Item>
        </Form>
    </Modal>;

};

export { EditModal };