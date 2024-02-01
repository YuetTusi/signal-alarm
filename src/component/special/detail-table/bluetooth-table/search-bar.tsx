import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent } from 'react';
import { Form, Button, DatePicker, Select } from 'antd';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { SearchBarBox } from './styled/box';
import { SearchBarProp } from './prop';

const { Option } = Select;
const { Item } = Form;

const SearchBar: FC<SearchBarProp> = ({ formRef, onSearch, onExport }) => {

    const {
        specialBluetoothTotal
    } = useModel(state => ({
        specialBluetoothTotal: state.specialBluetoothTotal
    }));

    useEffect(() => {
        formRef.setFieldsValue({
            beginTime: dayjs(dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00')),
            endTime: dayjs(dayjs().format('YYYY-MM-DD 23:59:59')),
            bluetoothType: 'all'
        });
    }, []);

    /**
     * 查询Click
     */
    const onSubmitClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime, bluetoothType } = formRef.getFieldsValue();
        onSearch(beginTime, endTime, bluetoothType);
    };

    /**
     * 导出Click
     */
    const onExportClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime, bluetoothType } = formRef.getFieldsValue();
        onExport(beginTime, endTime, bluetoothType);
    };

    return <SearchBarBox>
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
                    name="bluetoothType"
                    label="蓝牙类型">
                    <Select
                        style={{ width: '140px' }}>
                        <Option value="all">全部</Option>
                        <Option value="ble">低功耗蓝牙</Option>
                        <Option value="classic">经典蓝牙</Option>
                    </Select>
                </Item>
                <Item>
                    <Button
                        onClick={onSubmitClick}
                        type="primary">查询</Button>
                </Item>
            </Form>
        </div>
        <div>
            <Button
                onClick={onExportClick}
                disabled={specialBluetoothTotal === 0}
                type="primary">导出</Button>
        </div>
    </SearchBarBox>
};

export { SearchBar };