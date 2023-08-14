import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent } from 'react';
import { Form, Button, DatePicker, TreeSelect } from 'antd';
import { useModel } from '@/model';
import { helper } from "@/utility/helper";
import { Protocol } from '@/schema/protocol';
import { getTypeSelectSource } from './data-source';
import { SearchBarBox } from './styled/box';
import { SearchBarProp } from './prop';

const { Item } = Form;

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
        switch (type) {
            case 'all':
                onSearch(beginTime, endTime, helper.protocolToString([
                    Protocol.WiFi24G,
                    Protocol.WiFi58G,
                    Protocol.Bluetooth50
                ]));
                break;
            case 'hotspot':
                onSearch(beginTime, endTime, helper.protocolToString([
                    Protocol.WiFi24G,
                    Protocol.WiFi58G
                ]));
                break;
            case 'others':
                onSearch(beginTime, endTime, helper.protocolToString([
                    Protocol.Bluetooth50
                ]));
                break;
            default:
                onSearch(beginTime, endTime, type);
                break;
        }
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