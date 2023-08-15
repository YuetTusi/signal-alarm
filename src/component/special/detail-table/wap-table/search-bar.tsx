import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent } from 'react';
import { Form, Button, DatePicker, TreeSelect } from 'antd';
import useModel from '@/model';
import { helper } from '@/utility/helper';
import { Protocol } from '@/schema/protocol';
import { SearchBarBox } from './styled/box';
import { getTypeSelectSource, getTypes } from './data-source';
import { SearchBarProp } from './prop';

const { Item } = Form;

const SearchBar: FC<SearchBarProp> = ({
    parentOpen, formRef, onSearch, onExport
}) => {

    const {
        specialWapTotal
    } = useModel(state => ({
        specialWapTotal: state.specialWapTotal
    }));

    useEffect(() => {
        if (parentOpen) {
            formRef.setFieldsValue({
                beginTime: dayjs().add(-1, 'M'),
                endTime: dayjs(),
                type: 'all'
            });
        }
    }, [parentOpen, formRef]);

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
        onExport(beginTime, endTime, getTypes(type));
    };

    return <SearchBarBox>
        <div>
            <Form form={formRef} layout="inline">
                <Item
                    name="beginTime"
                    label="起始时间">
                    <DatePicker
                        allowClear={false}
                        inputReadOnly={true}
                        style={{ width: '120px' }} />
                </Item>
                <Item
                    name="endTime"
                    label="结束时间">
                    <DatePicker
                        allowClear={false}
                        inputReadOnly={true}
                        style={{ width: '120px' }} />
                </Item>
                <Item
                    name="type"
                    label="类型">
                    <TreeSelect
                        treeData={getTypeSelectSource()}
                        treeDefaultExpandAll={true}
                        treeLine={true}
                        listHeight={520}
                        style={{ width: '220px' }} />
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
                disabled={specialWapTotal === 0}
                type="primary">导出</Button>
        </div>
    </SearchBarBox>
};

export { SearchBar };