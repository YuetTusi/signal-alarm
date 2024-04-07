import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent } from 'react';
import { Form, Button, DatePicker } from 'antd';
import { SearchBarBox } from './styled/box';
import { SearchBarProp } from './prop';

const { Item } = Form;

const SearchBar: FC<SearchBarProp> = ({ formRef, onSearch, onGenerate }) => {

    useEffect(() => {
        formRef.setFieldsValue({
            beginTime: dayjs(dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00')),
            endTime: dayjs(dayjs().format('YYYY-MM-DD 23:59:59'))
        });
    }, []);

    /**
     * 查询Click
     */
    const onSubmitClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime } = formRef.getFieldsValue();
        onSearch(beginTime, endTime);
    };

    /**
     * 查询Click
     */
    const onGenerateClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime } = formRef.getFieldsValue();
        onGenerate(beginTime, endTime);
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
                <Item>
                    <Button
                        onClick={onSubmitClick}
                        type="primary">查询</Button>
                </Item>
                <Item>
                    <Button
                        onClick={onGenerateClick}
                        type="primary">生成</Button>
                </Item>
            </Form>
        </div>
    </SearchBarBox>
};

export { SearchBar };