import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModel } from '@/model';
import { Button, Input, DatePicker, Select, Form, Table } from 'antd';
import { BaseFreq } from '@/schema/base-freq';
import { toSelectData } from './tool';
import { BaseSearchForm } from './prop';
import { SearchBar, SpectrumBox, TableBox } from './styled/box';
import { getBaseColumns } from './column';

const { Option } = Select;
const { useForm, Item } = Form;

/**
 * 背景频谱
 */
const BaseSpectrum: FC<{}> = () => {

    const navigate = useNavigate();
    const [formRef] = useForm<BaseSearchForm>();
    const {
        baseSpectrumLoading,
        baseSpectrumData,
        baseSpectrumPageIndex,
        baseSpectrumPageSize,
        baseSpectrumTotal,
        baseSpectrumDeviceList,
        queryBaseSpectrumData,
        queryBaseSpectrumDeviceList
    } = useModel(state => ({
        baseSpectrumLoading: state.baseSpectrumLoading,
        baseSpectrumData: state.baseSpectrumData,
        baseSpectrumPageIndex: state.baseSpectrumPageIndex,
        baseSpectrumPageSize: state.baseSpectrumPageSize,
        baseSpectrumTotal: state.baseSpectrumTotal,
        baseSpectrumDeviceList: state.baseSpectrumDeviceList,
        queryBaseSpectrumData: state.queryBaseSpectrumData,
        queryBaseSpectrumDeviceList: state.queryBaseSpectrumDeviceList,
    }));

    useEffect(() => {
        const from = dayjs().add(-1, 'w');
        const to = dayjs();
        queryBaseSpectrumDeviceList();
        queryBaseSpectrumData(1, 15, {
            createTimeBegin: from.format('YYYY-MM-DD 00:00:00'),
            createTimeEnd: to.format('YYYY-MM-DD 23:59:59')
        });
        formRef.setFieldsValue({
            device: '-1',
            beginTime: dayjs(from.format('YYYY-MM-DD 00:00:00')),
            endTime: dayjs(to.format('YYYY-MM-DD 23:59:59'))
        })
    }, []);

    /**
     * 查询Click
     */
    const onSearchClick = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { getFieldsValue } = formRef;
        try {
            const values = getFieldsValue();
            await queryBaseSpectrumData(1, 15, {
                baseFreqName: values.name,
                deviceId: values.device,
                createTimeBegin: values.beginTime.format('YYYY-MM-DD HH:mm:ss'),
                createTimeEnd: values.endTime.format('YYYY-MM-DD HH:mm:ss'),
            });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 翻页Change
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     */
    const onPageChange = (pageIndex: number, pageSize: number) => {
        const { getFieldsValue } = formRef;
        queryBaseSpectrumData(pageIndex, pageSize, getFieldsValue());
    };

    /**
     * 返回主页Click
     */
    const onGoBackClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    return <SpectrumBox>
        <SearchBar>
            <div>
                <Form form={formRef} layout="inline">
                    <Item
                        name="name"
                        label="频谱名称">
                        <Input />
                    </Item>
                    <Item
                        name="device"
                        label="设备">
                        <Select
                            options={[
                                ...toSelectData(baseSpectrumDeviceList)
                            ]}
                            filterOption={
                                (input: string, option: any) =>
                                    (option?.label ?? '').includes(input)
                            }
                            showSearch={true}
                            style={{ width: '200px' }} />
                    </Item>
                    <Item
                        name="beginTime"
                        label="起始时间">
                        <DatePicker
                            showTime={true}
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '170px' }} />
                    </Item>
                    <Item
                        name="endTime"
                        label="结束时间">
                        <DatePicker
                            showTime={true}
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '170px' }} />
                    </Item>
                    <Item>
                        <Button
                            onClick={onSearchClick}
                            type="primary">查询</Button>
                    </Item>
                    <Item>
                        <Button
                            onClick={onGoBackClick}
                            type="default">返回主页</Button>
                    </Item>
                </Form>
            </div>
            <div></div>
        </SearchBar>
        <TableBox>
            <Table<BaseFreq>
                columns={getBaseColumns(() => { })}
                pagination={{
                    onChange: onPageChange,
                    current: baseSpectrumPageIndex,
                    pageSize: baseSpectrumPageSize,
                    total: baseSpectrumTotal,
                    showSizeChanger: false,
                    showTotal: (total) => `共${total}条`
                }}
                dataSource={baseSpectrumData}
                loading={baseSpectrumLoading}
                rowKey="id"
            />
        </TableBox>

    </SpectrumBox>
};

export { BaseSpectrum };