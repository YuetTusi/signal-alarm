import { FC, useEffect, MouseEvent } from 'react';
import { Modal, Button, Form, Switch } from 'antd';
import { StorageKeys } from '@/utility/storage-keys';
import { VoiceControlProp } from './prop';

const { useForm, Item } = Form;

/**
 * 预警声音开关弹框
 */
const VoiceControlModal: FC<VoiceControlProp> = ({ onOk, onCancel, open }) => {

    // const [turnOn, setTurnOn] = useState<boolean>(false);
    const [formRef] = useForm<{ voice: boolean }>();

    useEffect(() => {
        const { setFieldValue } = formRef;
        if (open) {
            const voice = localStorage.getItem(StorageKeys.Voice);
            setFieldValue('voice', voice === '1');
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
                onClick={() => onCancel()}
                type="default"
                key="VCM_1">取消</Button>,
            <Button
                onClick={onOkClick}
                type="primary"
                key="VCM_0">确定</Button>
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
            layout="horizontal">
            <Item
                name="voice"
                valuePropName="checked"
                label="预警声音">
                <Switch />
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