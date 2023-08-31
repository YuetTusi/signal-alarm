import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent } from 'react';
import { Form, Button, DatePicker, Select } from 'antd';
import useModel from '@/model';
import { SearchBarBox } from './styled/style';
import { SearchBarProp } from './prop';

const { Item } = Form;

const SearchBar: FC<SearchBarProp> = ({ formRef, selectedKeys, onBatch, onSearch, onExport }) => {

    const {
        alarmTotal
    } = useModel(state => ({
        alarmTotal: state.alarmTotal
    }));

    useEffect(() => {
        formRef.setFieldsValue({
            beginTime: dayjs().add(-1, 'M'),
            endTime: dayjs(),
            status: -1
        })
    }, []);

    /**
     * 查询Click
     */
    const onSubmitClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime, status } = formRef.getFieldsValue();
        onSearch(beginTime, endTime, status);
    };

    const onBatchClick = (event: MouseEvent) => {
        event.preventDefault();
        onBatch(selectedKeys as number[], 1, '');
    };

    /**
     * 导出Click
     */
    const onExportClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime, status } = formRef.getFieldsValue();
        onExport(beginTime, endTime, status);
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
                <Item
                    name="status"
                    label="状态">
                    <Select
                        options={[{
                            value: -1,
                            label: '全部'
                        }, {
                            value: 0,
                            label: '待处理'
                        }, {
                            value: 1,
                            label: '已处理'
                        }]}
                        style={{ width: '100px' }} />
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
                onClick={onBatchClick}
                disabled={selectedKeys.length === 0}
                type="primary">
                批量处理
            </Button>
            <Button
                onClick={onExportClick}
                disabled={alarmTotal === 0}
                type="primary">导出</Button>
        </div>
    </SearchBarBox>
};

export { SearchBar };