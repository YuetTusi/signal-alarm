import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent } from 'react';
import { Form, Button, DatePicker, TreeSelect } from 'antd';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { SearchBarBox } from './styled/box';
import { getTypeSelectSource, getTypes } from './data-source';
import { SearchBarProp } from './prop';

const { Item } = Form;

const SearchBar: FC<SearchBarProp> = ({ formRef, onSearch, onExport }) => {

    const {
        deviceList,
        specialHotspotTotal
    } = useModel(state => ({
        deviceList: state.deviceList,
        specialHotspotTotal: state.specialHotspotTotal
    }));

    useEffect(() => {
        formRef.setFieldsValue({
            beginTime: dayjs(dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00')),
            endTime: dayjs(dayjs().format('YYYY-MM-DD 23:59:59')),
            type: 'all',
            site: [JSON.stringify({ type: 'all', deviceId: [] })]
        });
    }, []);

    /**
     * 查询Click
     */
    const onSubmitClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime, type, site } = formRef.getFieldsValue();
        const deviceId = helper.getDeviceIdFromDropdown(site);
        onSearch(beginTime, endTime, getTypes(type), deviceId);
    };

    /**
     * 导出Click
     */
    const onExportClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime, type, site } = formRef.getFieldsValue();
        const deviceId = helper.getDeviceIdFromDropdown(site);
        onExport(beginTime, endTime, getTypes(type), deviceId);
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
                        style={{ width: '200px' }} />
                </Item>
                <Item
                    name="endTime"
                    label="结束时间">
                    <DatePicker
                        showTime={true}
                        allowClear={false}
                        inputReadOnly={true}
                        style={{ width: '200px' }} />
                </Item>
                <Item
                    name="type"
                    label="类型">
                    <TreeSelect
                        treeData={getTypeSelectSource()}
                        treeDefaultExpandAll={true}
                        treeLine={true}
                        listHeight={520}
                        style={{ width: '140px' }} />
                </Item>
                <Item
                    name="site"
                    label="设备场所">
                    <TreeSelect
                        treeData={helper.toDeviceDropdown(deviceList)}
                        allowClear={true}
                        autoClearSearchValue={false}
                        treeCheckable={true}
                        filterTreeNode={true}
                        treeNodeFilterProp="title"
                        showCheckedStrategy={TreeSelect.SHOW_PARENT}
                        treeDefaultExpandAll={true}
                        treeLine={true}
                        maxTagCount={2}
                        maxTagTextLength={3}
                        listHeight={520}
                        style={{ width: '280px' }} />
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