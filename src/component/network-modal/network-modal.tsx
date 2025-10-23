import path from 'path';
import { FC, MouseEvent, useEffect } from 'react';
import { Button, Radio, Modal, Form, Input, RadioChangeEvent } from 'antd';
import { AppMode } from '@/schema/conf';
import { IP, Port } from '@/utility/regex';
import { APP_NAME, FETCH_IP, FETCH_PORT, helper } from '@/utility/helper';
import { NetworkModalProp, FormValue } from './prop';

const cwd = process.cwd();
const { join } = path;
const { useForm, Item } = Form;
const { Group } = Radio;
const ipJson = helper.IS_DEV ? join(cwd, './setting/ip.json') : join(cwd, 'resources/ip.json');
const confJson = helper.IS_DEV ? join(cwd, './setting/conf.json') : join(cwd, 'resources/conf.json');

/**
 * 应用设置
 */
const NetworkModal: FC<NetworkModalProp> = ({
    open, onOk, onCancel
}) => {

    const [formRef] = useForm<FormValue>();

    useEffect(() => {
        const { setFieldsValue } = formRef;
        if (open) {
            (async () => {
                try {
                    const [ipExist, confExist] = await Promise.all([
                        helper.existFile(ipJson),
                        helper.existFile(confJson)
                    ]);
                    if (ipExist) {
                        const values = await helper.readJson(ipJson);
                        setFieldsValue({
                            appName: values?.appName ?? APP_NAME,
                            ip: values?.ip ?? FETCH_IP,
                            port: values?.port ?? FETCH_PORT
                        });
                    } else {
                        setFieldsValue({
                            appName: APP_NAME,
                            ip: FETCH_IP,
                            port: FETCH_PORT
                        });
                    }
                    if (confExist) {
                        const values = await helper.readJson(confJson);
                        setFieldsValue({ mode: values.mode ?? AppMode.PC });
                    } else {
                        setFieldsValue({ mode: AppMode.PC });
                    }
                } catch (error) {
                    console.error(`读取ip.json失败:${error.message}`);
                    setFieldsValue({
                        appName: APP_NAME,
                        ip: FETCH_IP,
                        port: FETCH_PORT
                    });
                }
            })();
        }
    }, [open]);

    /**
     * 确定Click
     */
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

    /**
     * 取消Click
     */
    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        const { resetFields } = formRef;
        resetFields();
        onCancel();
    };

    const onModeChange = (value: RadioChangeEvent) => {
        console.log(value);
    };

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="NM_0">取消</Button>,
            <Button onClick={onOkClick} type="primary" key="NM_1">确定</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        centered={true}
        maskClosable={false}
        destroyOnHidden={true}
        width={400}
        title="应用设置"
        getContainer="#app">
        <Form
            form={formRef}
            layout="vertical"
            style={{ marginTop: '20px' }}>
            <Item
                rules={[
                    { required: true, message: '请填写应用名称' }
                ]}
                name="appName"
                label="应用名称">
                <Input />
            </Item>
            <Item
                rules={[
                    { required: true, message: '请填写IP地址' },
                    { pattern: IP, message: 'IP地址格式有误' }
                ]}
                name="ip"
                label="IP地址">
                <Input />
            </Item>
            <Item
                rules={[
                    { required: true, message: '请填写端口号' },
                    { pattern: Port, message: '端口号格式有误' }
                ]}
                name="port"
                label="端口号">
                <Input />
            </Item>
            <Item
                rules={[{ required: true, message: '请填写端口号' }]}
                name="mode"
                label="版本">
                <Group onChange={onModeChange}>
                    <Radio value={AppMode.PC}>网络版</Radio>
                    <Radio value={AppMode.FullScreen}>单机版</Radio>
                </Group>
            </Item>
        </Form>
    </Modal>
};

export { NetworkModal };