import { FC, useEffect, MouseEvent } from 'react';
import { Modal, Button, Form, Select } from 'antd';
import { VoiceControlProp } from './prop';
import { StorageKeys } from '@/utility/storage-keys';

const { Option } = Select;
const { useForm, Item } = Form;

/**
 * 预警声音开关弹框
 */
const VoiceControlModal: FC<VoiceControlProp> = ({ onOk, onCancel, open }) => {

    const [formRef] = useForm<{ voice: '0' | '1' }>();

    useEffect(() => {
        const { setFieldValue } = formRef;
        if (open) {
            const voice = localStorage.getItem(StorageKeys.Voice);
            setFieldValue('voice', voice === '1' ? '1' : '0');
        }
    }, [open]);

    /**
     * 确定按钮Click
     * @param event 
     */
    const onOkClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { getFieldsValue } = formRef;
        onOk(getFieldsValue().voice);
    }

    return <Modal
        footer={[
            <Button
                onClick={onOkClick}
                type="primary"
                key="VCM_0">确定</Button>,
            <Button
                onClick={() => onCancel()}
                type="default"
                key="VCM_1">取消</Button>
        ]}
        onCancel={onCancel}
        open={open}
        centered={true}
        maskClosable={false}
        destroyOnClose={true}
        width={380}
        title="预警声音开关设置"
        getContainer="#app">
        <Form
            form={formRef}
            style={{ marginTop: '20px' }}
            layout="vertical">
            <Item
                name="voice"
                label="预警声音">
                <Select>
                    <Option value="1">打开</Option>
                    <Option value="0">关闭</Option>
                </Select>
            </Item>
        </Form>
    </Modal>
};

VoiceControlModal.defaultProps = {
    open: false,
    onOk: () => { },
    onCancel: () => { }
};

export { VoiceControlModal };