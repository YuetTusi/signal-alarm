import path from 'path';
import { FC, MouseEvent, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { IP, Port } from '@/utility/regex';
import { APP_NAME, FETCH_IP, FETCH_PORT, helper } from '@/utility/helper';
import { NetworkModalProp, FormValue } from './prop';

const cwd = process.cwd();
const { join } = path;
const { useForm, Item } = Form;
const ipJson = helper.IS_DEV ? join(cwd, './setting/ip.json') : join(cwd, 'resources/ip.json');

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
                    const exist = await helper.existFile(ipJson);
                    if (exist) {
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
            const { appName, ip, port } = await validateFields();
            onOk(appName, ip, port);
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
    }

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="NM_0">取消</Button>,
            <Button onClick={onOkClick} type="primary" key="NM_1">确定</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        centered={true}
        maskClosable={false}
        destroyOnClose={true}
        width={400}
        title="应用设置"
        getContainer="#app">
        <Form form={formRef} layout="vertical">
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
        </Form>
    </Modal>
};

NetworkModal.defaultProps = {
    open: false,
    onCancel: () => { },
    onOk: () => { }
};

export { NetworkModal };