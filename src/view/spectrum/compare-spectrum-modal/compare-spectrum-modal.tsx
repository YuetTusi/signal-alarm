import { FC, MouseEvent, useEffect, useState } from 'react';
import { Key } from 'antd/es/table/interface';
import { Button, Divider, Input, Form, Modal, Table, message } from 'antd';
import { useModel } from '@/model';
import { BaseFreq } from '@/schema/base-freq';
import { getColumns } from './column';
import { CompareSpectrumModalProp } from './prop';

const { useForm, Item } = Form;

/**
 * 比对框
 * @param param0 
 * @returns 
 */
const CompareSpectrumModal: FC<CompareSpectrumModalProp> = ({
    open, deviceId, onCancel, onOk
}) => {

    const [formRef] = useForm<{ cmpName: string }>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    const {
        compareBaseSpectrumData,
        compareBaseSpectrumLoading,
        setCompareBaseSpectrumData,
        queryBaseSpectrumDataByDeviceId
    } = useModel(state => ({
        compareBaseSpectrumData: state.compareBaseSpectrumData,
        compareBaseSpectrumLoading: state.compareBaseSpectrumLoading,
        setCompareBaseSpectrumData: state.setCompareBaseSpectrumData,
        queryBaseSpectrumDataByDeviceId: state.queryBaseSpectrumDataByDeviceId
    }));

    useEffect(() => {
        if (open) {
            queryBaseSpectrumDataByDeviceId(deviceId);
            // formRef.setFieldsValue({ cmpName: '历史比对测试1111' });
        }
    }, [open, deviceId]);

    const onSelectChange = (key: Key[]) => {
        setSelectedRowKeys(key);
    };

    const onCancelClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setCompareBaseSpectrumData([]);
        setSelectedRowKeys([]);
        formRef.resetFields();
        onCancel();
    };

    const onOkClick = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { resetFields, validateFields } = formRef;
        message.destroy();
        if (selectedRowKeys.length === 0) {
            message.warning('请选择背景频谱')
        } else {
            try {
                const { cmpName } = await validateFields();
                onOk(selectedRowKeys[0].toString(), cmpName);
                setSelectedRowKeys([]);
                resetFields();
            } catch (error) {
                console.warn(error);
            }
        }
    };

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="CSM_0">取消</Button>,
            <Button onClick={onOkClick} type="primary" key="CSM_1">确定</Button>
        ]}
        open={open}
        onCancel={onCancelClick}
        centered={true}
        maskClosable={false}
        destroyOnClose={true}
        forceRender={true}
        width={680}
        title="频谱比对"
        getContainer="#app">
        <Table<BaseFreq>
            columns={getColumns()}
            dataSource={compareBaseSpectrumData}
            loading={compareBaseSpectrumLoading}
            pagination={false}
            scroll={{ x: 'max-content', y: 200 }}
            rowKey={'freqBaseId'}
            onRow={(record) => ({
                onClick() {
                    setSelectedRowKeys([record.freqBaseId]);
                }
            })}
            rowSelection={{
                type: 'radio',
                selectedRowKeys,
                onChange: onSelectChange
            }}
        />
        <Divider />
        <Form form={formRef} layout="vertical">
            <Item
                rules={[
                    { required: true, message: '请填写比对名称' }
                ]}
                name="cmpName"
                label="比对名称">
                <Input />
            </Item>
        </Form>
    </Modal>
};

CompareSpectrumModal.defaultProps = {
    open: false,
    deviceId: '',
    onCancel: () => { },
    onOk: () => { }
};

export { CompareSpectrumModal };