import { FC, useEffect, useState } from 'react';
import { Key } from 'antd/es/table/interface';
import {
    App, Col, Row, Button, Form,
    Input, InputNumber, Select, Table, Tag
} from 'antd';
import { useModel } from '@/model';
import { useUnmount } from '@/hook';
import { BaseFreq } from '@/schema/base-freq';
import { BgDesc } from './bg-desc';
import { toSelectData } from '../tool';
import { SetFormProp } from './prop';

const { Option } = Select;
const { Item } = Form;

/**
 * 表单
 */
const SetForm: FC<SetFormProp> = ({ formRef }) => {

    const { modal } = App.useApp();
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [isSelfValue, setIsSelfValue] = useState<boolean>(false);
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
        // setFieldsValue({
        //     // offset: 10
        //     // selfOffset: undefined,
        //     // presetOffset: undefined
        // });
        queryRealSpectrumDeviceList();
    }, []);

    useUnmount(() => {
        const { setFieldsValue } = formRef;
        // setFieldsValue({
        //     // offset: 10
        //     // selfOffset: undefined,
        //     // presetOffset: undefined
        // });
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
            <Row
                style={{ display: isSelfValue ? 'flex' : 'none' }}
                align="middle"
                gutter={16}>
                <Col flex={1}>
                    <Item
                        rules={[
                            { required: isSelfValue, message: '请填写偏移值' }
                        ]}
                        label="偏移值"
                        name="offset">
                        <InputNumber
                            min={10}
                            max={35}
                            placeholder="范围10 ~ 35"
                            style={{ width: '100%' }} />
                    </Item>
                </Col>
                <Col flex="none">
                    <Button
                        onClick={() => {
                            formRef.setFieldValue('offset', undefined);
                            setIsSelfValue(false);
                        }}
                        style={{ top: '4px' }}
                        type="default">预设值</Button>
                </Col>
            </Row>
            <Row
                style={{ display: !isSelfValue ? 'flex' : 'none' }}
                align="middle"
                gutter={16}>
                <Col flex={1}>
                    <Item
                        rules={[
                            { required: !isSelfValue, message: '请选择偏移值' }
                        ]}
                        label="偏移值"
                        name="offset">
                        <Select placeholder="请选择偏移值">
                            <Option value={10}>10</Option>
                            <Option value={15}>15</Option>
                            <Option value={20}>20</Option>
                            <Option value={25}>25</Option>
                            <Option value={30}>30</Option>
                            <Option value={35}>35</Option>
                        </Select>
                    </Item>
                </Col>
                <Col flex="none">
                    <Button
                        onClick={() => {
                            formRef.setFieldValue('offset', undefined);
                            setIsSelfValue(true);
                        }}
                        style={{ top: '4px' }}
                        type="default">自定义</Button>
                </Col>
            </Row>
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
            style={{ marginTop: '10px' }}
        />
    </>;
};

export { SetForm };