import { FC, useEffect, useState } from 'react';
import { Key } from 'antd/es/table/interface';
import { App, Button, Form, Input, InputNumber, Select, Table, Tag } from 'antd';
import { useModel } from '@/model';
import { useUnmount } from '@/hook';
import { BaseFreq } from '@/schema/base-freq';
import { BgDesc } from './bg-desc';
import { toSelectData } from '../tool';
import { SetFormProp } from './prop';

const { Item } = Form;

/**
 * 表单
 */
const SetForm: FC<SetFormProp> = ({ formRef }) => {

    const { modal } = App.useApp();
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const {
        specLiving,
        realSpectrumDeviceList,
        compareBaseSpectrumData,
        compareBaseSpectrumLoading,
        clearCompareBaseSpectrumData,
        queryRealSpectrumDeviceList,
        queryBaseSpectrumDataByDeviceId
    } = useModel(state => ({
        specLiving: state.specLiving,
        realSpectrumDeviceList: state.realSpectrumDeviceList,
        compareBaseSpectrumData: state.compareBaseSpectrumData,
        compareBaseSpectrumLoading: state.compareBaseSpectrumLoading,
        clearCompareBaseSpectrumData: state.clearCompareBaseSpectrumData,
        queryRealSpectrumDeviceList: state.queryRealSpectrumDeviceList,
        queryBaseSpectrumDataByDeviceId: state.queryBaseSpectrumDataByDeviceId
    }));

    useEffect(() => {
        const { setFieldsValue } = formRef;
        setFieldsValue({ offset: 15 });
        queryRealSpectrumDeviceList();
    }, []);

    useUnmount(() => {
        const { setFieldsValue } = formRef;
        setFieldsValue({ offset: 15 });
        clearCompareBaseSpectrumData();
    });

    /**
     * 设备下拉Change
     */
    const onDeviceChange = (value: string) => {
        const { setFieldsValue } = formRef;
        setFieldsValue({ freqBaseId: '' });
        setSelectedRowKeys([]);
        queryBaseSpectrumDataByDeviceId(value);
    };

    /**
     * 行选择Change
     */
    const onSelectChange = (key: Key[]) => {
        const { setFieldsValue } = formRef;
        setSelectedRowKeys(key);
        setFieldsValue({ freqBaseId: key[0] as string });
    };

    return <>
        <Form disabled={specLiving} form={formRef} layout="vertical">
            <Item
                rules={[
                    { required: true, message: '请选择设备' }
                ]}
                name="device"
                label="设备">
                <Select
                    onChange={onDeviceChange}
                    options={toSelectData(realSpectrumDeviceList)}
                    filterOption={
                        (value: string, option: any) =>
                            (option?.label ?? '').includes(value)
                    }
                    showSearch={true}
                    style={{ width: '100%' }}
                />
            </Item>
            <Item
                rules={[
                    { required: true, message: '填写偏移值' }
                ]}
                label="偏移值"
                name="offset">
                <InputNumber
                    min={15}
                    max={90}
                    style={{ width: '100%' }} />
            </Item>
            <Item name="freqBaseId" className="fn-hidden">
                <Input readOnly={true} />
            </Item>
        </Form>
        <Table<BaseFreq>
            columns={[{
                title: '背景频谱',
                key: 'baseFreqName',
                dataIndex: 'baseFreqName',
                render(val: string, record) {
                    return <Button
                        onClick={() => modal.info({
                            content: <BgDesc data={record} />,
                            title: '背景频谱详情',
                            okText: '确定',
                            centered: true,
                            width: 600
                        })}
                        type="link">
                        {val}
                    </Button>
                }
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                align: 'center',
                width: 60,
                render: (val: number) => {
                    switch (val) {
                        case 0:
                            return <Tag color="red">停用</Tag>;
                        case 1:
                            return <Tag color="green">正常</Tag>;
                        default:
                            return <Tag>未知</Tag>;
                    }
                }
            }]}
            dataSource={compareBaseSpectrumData}
            loading={compareBaseSpectrumLoading}
            pagination={false}
            scroll={{ y: 400 }}
            rowKey={'freqBaseId'}
            onRow={(record) => ({
                onClick() {
                    setSelectedRowKeys([record.freqBaseId]);
                    formRef.setFieldsValue({ freqBaseId: record.freqBaseId });
                }
            })}
            rowSelection={{
                type: 'radio',
                selectedRowKeys,
                onChange: onSelectChange,
                getCheckboxProps: (_) => ({ disabled: specLiving })
            }}
            style={{ marginTop: '40px' }}
        />
    </>;
};

export { SetForm };