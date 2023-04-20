import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent } from 'react';
import { Form, Button, DatePicker } from 'antd';
import { useModel } from '@/model';
import { SearchBarBox } from './styled/box';
import { SearchBarProp, SearchFormValue } from './prop';

const { Item, useForm } = Form;

const SearchBar: FC<SearchBarProp> = ({ onSearch, onExport }) => {

    const [formRef] = useForm<SearchFormValue>();

    const {
        specialHotspotTotal
    } = useModel(state => ({
        specialHotspotTotal: state.specialHotspotTotal
    }));

    useEffect(() => {
        formRef.setFieldsValue({
            beginTime: dayjs().add(-1, 'M'),
            endTime: dayjs()
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
     * 导出Click
     */
    const onExportClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime } = formRef.getFieldsValue();
        onExport(beginTime, endTime);
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
                disabled={specialHotspotTotal === 0}
                type="primary">导出</Button>
        </div>
    </SearchBarBox>
};

export { SearchBar };