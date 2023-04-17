import { FC, MouseEvent, useEffect } from 'react';
import { Button, Form, Modal } from 'antd';
import { ComDevice } from '@/schema/com-device';
import { DeviceForm } from './device-form';
import { AddModalBox, FormBox } from './styled/box';
import { AddModalProp } from './prop';

const { useForm } = Form;

const AddModal: FC<AddModalProp> = ({
    open, data, onOk, onCancel
}) => {

    const [formRef] = useForm<ComDevice>();

    useEffect(() => {
        if (!open) {
            formRef.resetFields();
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
            if (data) {
                onOk({ ...data, ...values });
            } else {
                onOk(values);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 取消Click
     */
    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        formRef.resetFields();
        onCancel();
    };

    return <AddModalBox>
        <Modal
            footer={[
                <Button
                    onClick={onCancelClick}
                    type="default"
                    key="ADM_0">
                    取消
                </Button>,
                <Button
                    onClick={onOkClick}
                    type="primary"
                    key="ADM_1">
                    确定
                </Button>
            ]}
            onCancel={onCancelClick}
            open={open}
            width={500}
            title={data === undefined ? '添加设备' : '编辑设备'}
            getContainer="#app"
            forceRender={true}
            destroyOnClose={true}
            maskClosable={false}
            centered={true}>
            <FormBox>
                <DeviceForm
                    formRef={formRef}
                    data={data} />
            </FormBox>
        </Modal>
    </AddModalBox>
};

export { AddModal };