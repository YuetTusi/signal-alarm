import { FC, MouseEvent, useEffect } from 'react';
import { Button, Form, Modal } from 'antd';
import { useModel } from '@/model';
import { DeviceForm } from './device-form';
import { AddModalBox, FormBox } from './styled/box';
import { AddModalProp, FormValue } from './prop';

const { useForm } = Form;

const AddModal: FC<AddModalProp> = ({
    open, data, onOk, onCancel
}) => {

    const [formRef] = useForm<FormValue>();
    const {
        queryZoneList
    } = useModel(state => ({
        queryZoneList: state.queryZoneList
    }));

    useEffect(() => {
        if (open) {
            queryZoneList();
        } else {
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
            let point = [0, 0];
            if (values.point === '') {
                point = [0, 0];
            } else {
                const [x, y] = values.point.split(',');
                point = [Number(x), Number(y)];
            }
            if (data) {
                //编辑
                onOk({
                    ...data,
                    ...values,
                    lat: point[0],
                    lon: point[1]
                });
            } else {
                //添加
                onOk({
                    ...values,
                    lat: point[0],
                    lon: point[1]
                });
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
            width={540}
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