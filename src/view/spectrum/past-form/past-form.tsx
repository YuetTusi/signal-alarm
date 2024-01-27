import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { Key } from 'antd/es/table/interface';
import {
    App, Col, Row, Button, DatePicker, Form,
    Input, InputNumber, Select, Table, Tag
} from 'antd';
import { useModel } from '@/model';
import { useUnmount } from '@/hook';
import { BaseFreq } from '@/schema/base-freq';
import { BgDesc } from './bg-desc';
import { toSelectData } from '../tool';
import { PastFormProp } from './prop';

const { Option } = Select;
const { Item } = Form;

/**
 * 历史频谱表单
 */
const PastForm: FC<PastFormProp> = ({ formRef }) => {

    const { modal } = App.useApp();
    const [isSelfValue, setIsSelfValue] = useState<boolean>(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const {
        specPlaying,
        historySpectrumDeviceList,
        compareBaseSpectrumData,
        compareBaseSpectrumLoading,
        clearCompareBaseSpectrumData,
        clearHistorySpectrumData,
        queryHistorySpectrumDeviceList,
        queryBaseSpectrumDataByDeviceId
    } = useModel(state => ({
        specPlaying: state.specPlaying,
        historySpectrumDeviceList: state.historySpectrumDeviceList,
        allBgFreqList: state.allBgFreqList,
        compareBaseSpectrumData: state.compareBaseSpectrumData,
        compareBaseSpectrumLoading: state.compareBaseSpectrumLoading,
        clearCompareBaseSpectrumData: state.clearCompareBaseSpectrumData,
        clearHistorySpectrumData: state.clearHistorySpectrumData,
        queryHistorySpectrumDeviceList: state.queryHistorySpectrumDeviceList,
        queryBaseSpectrumDataByDeviceId: state.queryBaseSpectrumDataByDeviceId
    }));

    useEffect(() => {
        const { setFieldsValue } = formRef;
        setFieldsValue({ offset: 15 });
        setFieldsValue({ startTime: dayjs().add(-5, 'minute') });
        // setFieldsValue({ startTime: dayjs().add(-10, 'second') });
        setFieldsValue({ endTime: dayjs() });
        queryHistorySpectrumDeviceList();
    }, []);

    useUnmount(() => {
        const { setFieldsValue } = formRef;
        setFieldsValue({ offset: 15 });
        clearHistorySpectrumData();
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
        <Form disabled={specPlaying} form={formRef} layout="vertical">
            <Row justify="space-between">
                <Col>
                    <Item
                        rules={[
                            { required: true, message: '请选择起始时间' }
                        ]}
                        name="startTime"
                        label="起始时间">
                        <DatePicker
                            showTime={true}
                            allowClear={false}
                            style={{ width: '200px' }} />
                    </Item>
                </Col>
                <Col>
                    <Item
                        rules={[
                            { required: true, message: '请选择结束时间' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const start = getFieldValue('startTime');
                                    if (value.diff(start, 'minute') < 10) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(new Error('时间间隔在10分钟内'));
                                    }
                                }
                            })
                        ]}
                        name="endTime"
                        label="结束时间"
                        tooltip="起始至结束间隔在10分钟内">
                        <DatePicker
                            showTime={true}
                            allowClear={false}
                            style={{ width: '200px' }} />
                    </Item>
                </Col>
            </Row>
            <Item
                rules={[
                    { required: true, message: '请选择设备' }
                ]}
                name="device"
                label="设备">
                <Select
                    onChange={onDeviceChange}
                    options={toSelectData(historySpectrumDeviceList)}
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
            scroll={{ y: 285 }}
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
                getCheckboxProps: (_) => ({ disabled: specPlaying })
            }}
            style={{ marginTop: '40px' }}
        />
    </>;
};

export { PastForm };