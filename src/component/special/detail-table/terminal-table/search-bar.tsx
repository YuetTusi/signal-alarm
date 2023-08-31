import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent } from 'react';
import { Form, Button, DatePicker, Select, TreeSelect } from 'antd';
import { useModel } from '@/model';
import { getTypeSelectSource, getTypes } from './data-source';
import { SearchBarBox } from './styled/box';
import { SearchBarProp } from './prop';

const { Item } = Form;
const { Option } = Select;

const SearchBar: FC<SearchBarProp> = ({ formRef, onSearch, onExport }) => {

    const {
        specialTerminalTotal
    } = useModel(state => ({
        specialTerminalTotal: state.specialTerminalTotal
    }));

    useEffect(() => {
        formRef.setFieldsValue({
            beginTime: dayjs().add(-1, 'M'),
            endTime: dayjs(),
            type: 'all'
        });
    }, []);

    /**
     * 查询Click
     */
    const onSubmitClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime, type } = formRef.getFieldsValue();
        onSearch(beginTime, endTime, getTypes(type));
    };

    /**
     * 导出Click
     */
    const onExportClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime, type } = formRef.getFieldsValue();
        onExport(beginTime, endTime, type);
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
                    name="type"
                    label="类型">
                    <TreeSelect
                        treeData={getTypeSelectSource()}
                        treeDefaultExpandAll={true}
                        treeLine={true}
                        listHeight={520}
                        style={{ width: '160px' }} />
                </Item>
                {/* <Item
                    initialValue={-1}
                    name="connect"
                    label="连接状态">
                    <Select style={{ width: '80px' }}>
                        <Option value={-1}>全部</Option>
                        <Option value={1}>已连接</Option>
                        <Option value={0}>未连接</Option>
                    </Select>
                </Item> */}
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
                disabled={specialTerminalTotal === 0}
                type="primary">导出</Button>
        </div>
    </SearchBarBox>
};

export { SearchBar };