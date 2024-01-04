import { FC, useEffect } from 'react';
import { Button, Form, Modal, message } from 'antd';
import { EditForm } from './edit-form';
import { Zone } from '@/schema/zone';
import { helper } from '@/utility/helper';
import { EditModalProp } from './prop';

const { useForm } = Form;

/**
 * 编辑框
 */
const EditModal: FC<EditModalProp> = ({ open, data, onOk, onCancel }) => {

    const [formRef] = useForm<Zone>();

    useEffect(() => {
        const { setFieldValue } = formRef;
        if (!helper.isNullOrUndefined(data)) {
            setFieldValue('areaName', data!.areaName);
            setFieldValue('areaWidth', data!.areaWidth ?? 0);
            setFieldValue('areaHeight', data!.areaHeight ?? 0);
        }
    }, [data]);

    const onOkClick = async () => {
        const { resetFields, validateFields } = formRef;

        try {
            const values = await validateFields();

            if (helper.isNullOrUndefined(data)) {
                //添加
                if (helper.isNullOrUndefined(values.areaBg) || values.areaBg === '') {
                    message.destroy();
                    message.info('请选择区域图像');
                } else {
                    onOk(values, false);
                }
            } else {
                //编辑
                onOk({ ...data, ...values }, true);
                resetFields();
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const onCancelClick = () => {
        // formRef.resetFields();
        onCancel();
    }

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="EM_0">取消</Button>,
            <Button onClick={onOkClick} type="primary" key="EM_1">确定</Button>
        ]}
        open={open}
        width={460}
        onCancel={onCancelClick}
        title={data === undefined ? '添加区域' : '编辑区域'}
        centered={true}
        forceRender={false}
        maskClosable={false}
        destroyOnClose={false}
        getContainer="#app">
        <EditForm formRef={formRef} data={data} />
    </Modal>
};

export { EditModal };