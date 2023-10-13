import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent } from 'react';
import { Form, Button, DatePicker, Select, TreeSelect } from 'antd';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { SearchBarBox } from './styled/style';
import { SearchBarProp } from './prop';

const { Item } = Form;

const SearchBar: FC<SearchBarProp> = ({
    formRef, selectedKeys, onBatch, onSearch, onExport
}) => {

    const {
        deviceList,
        alarmTotal
    } = useModel(state => ({
        deviceList: state.deviceList,
        alarmTotal: state.alarmTotal
    }));

    useEffect(() => {
        formRef.setFieldsValue({
            beginTime: dayjs(dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00')),
            endTime: dayjs(dayjs().format('YYYY-MM-DD 23:59:59')),
            status: 0,
            site: [JSON.stringify({ type: 'all', deviceId: [] })]
        })
    }, []);

    /**
     * 查询Click
     */
    const onSubmitClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime, status, site } = formRef.getFieldsValue();
        const deviceId = helper.getDeviceIdFromDropdown(site);
        onSearch(beginTime, endTime, status, deviceId);
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
        const { beginTime, endTime, status, site } = formRef.getFieldsValue();
        const deviceId = helper.getDeviceIdFromDropdown(site);
        onExport(beginTime, endTime, status, deviceId);
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