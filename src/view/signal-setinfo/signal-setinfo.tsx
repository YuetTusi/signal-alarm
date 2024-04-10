import dayjs from 'dayjs';
import { FC, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Select, Button, DatePicker, Input, Table } from 'antd';
import { helper } from '@/utility/helper';
import { useModel, useShallow } from '@/model';
import { ContinuousSignal } from '@/schema/continuous-signal';
import { SearchFormValue, SignalSetInfoProp } from './prop';
import { SignalBox, SearchBar, TableBox } from './styled/box';
import { getColumns } from './column';

const { Option } = Select;
const { Item, useForm } = Form;

/**
 * 可疑持续信号
 */
const SignalSetInfo: FC<SignalSetInfoProp> = () => {

    const navigate = useNavigate();
    const [formRef] = useForm<SearchFormValue>();
    const {
        deviceList,
        signalLoading,
        signalData,
        signalPageIndex,
        signalPageSize,
        signalTotal,
        queryDeviceList,
        querySignalData
    } = useModel(useShallow((state) => ({
        deviceList: state.deviceList,
        signalLoading: state.signalLoading,
        signalData: state.signalData,
        signalPageIndex: state.signalPageIndex,
        signalPageSize: state.signalPageSize,
        signalTotal: state.signalTotal,
        queryDeviceList: state.queryDeviceList,
        querySignalData: state.querySignalData
    })));

    useEffect(() => {
        const beginTime = dayjs().add(-1, 'day');
        const endTime = dayjs();
        formRef.setFieldsValue({
            deviceId: '',
            beginTime,
            endTime
        });
        queryDeviceList();
        querySignalData(1, helper.PAGE_SIZE, {
            beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
            deviceId: ''
        });
    }, []);

    const bindDeviceOption = () =>
        deviceList.map(item =>
            <Option value={item.deviceName} key={`Dev_${item.id}`}>
                {item.deviceName}
            </Option>
        );

    /**
     * 查询Click
     */
    const onSearchClick = (event: MouseEvent) => {
        event.preventDefault();
        const { getFieldsValue } = formRef;
        const { beginTime, endTime, deviceId } = getFieldsValue();
        querySignalData(1, helper.PAGE_SIZE, {
            beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
            deviceId
        });
    };

    /**
     * 返回Click
     */
    const onGoBackClick = (event: MouseEvent) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    const onPageChange = (pageIndex: number, pageSize: number) => {
        const { getFieldsValue } = formRef;
        const { beginTime, endTime, deviceId } = getFieldsValue();
        querySignalData(pageIndex, pageSize, {
            beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
            deviceId
        });
    };

    return <SignalBox>
        <SearchBar>
            <div>
                <Form form={formRef} layout="inline">
                    <Item
                        name="beginTime"
                        label="起始时间">
                        <DatePicker
                            showTime={true}
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '270px' }} />
                    </Item>
                    <Item
                        name="endTime"
                        label="结束时间">
                        <DatePicker
                            showTime={true}
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '270px' }} />
                    </Item>
                    <Item
                        name="deviceId"
                        label="设备">
                        <Select style={{ width: '240px' }}>
                            {[
                                <Option value={''} key="Dev_ALL">全部</Option>,
                                ...bindDeviceOption()
                            ]}
                        </Select>
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
            <div />
        </SearchBar>
        <TableBox>
            <Table<ContinuousSignal>
                columns={getColumns()}
                dataSource={signalData}
                loading={signalLoading}
                pagination={
                    {
                        onChange: onPageChange,
                        total: signalTotal,
                        current: signalPageIndex,
                        pageSize: signalPageSize,
                        showSizeChanger: false,
                        showTotal: (total) => `共${total}条`
                    }
                }
            />
        </TableBox>
    </SignalBox>;
};

export { SignalSetInfo };