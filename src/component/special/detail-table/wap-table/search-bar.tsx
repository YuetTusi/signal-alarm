import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent, ReactNode } from 'react';
import { Form, Button, DatePicker, TreeSelect } from 'antd';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { SearchBarBox } from './styled/box';
import { getTypeSelectSource, getTypes } from './data-source';
import { DevInSite, SearchBarProp } from './prop';

const { Item } = Form;

const SearchBar: FC<SearchBarProp> = ({
    parentOpen, formRef, onSearch, onExport
}) => {

    const {
        specialWapTotal,
        deviceList
    } = useModel(state => ({
        specialWapTotal: state.specialWapTotal,
        deviceList: state.deviceList
    }));

    useEffect(() => {
        if (parentOpen) {
            formRef.setFieldsValue({
                beginTime: dayjs().add(-1, 'M'),
                endTime: dayjs(),
                type: 'all',
                site: [JSON.stringify({ type: 'all', deviceId: [] })]
            });
        }
    }, [parentOpen, formRef]);

    /**
     * 查询Click
     */
    const onSubmitClick = (event: MouseEvent) => {
        event.preventDefault();
        const { beginTime, endTime, type, site } = formRef.getFieldsValue();

        let deviceId: string | undefined = undefined;
        try {
            if (site.length === 0) {
                deviceId = undefined;
            } else if (site.length === 1) {
                const data: DevInSite = JSON.parse(site[0]);
                if (data.type === 'all') {
                    deviceId = undefined;
                } else {
                    //只选了一个节点，但不是全部
                    deviceId = data.deviceId.join(',');
                }
            } else {
                //选了多个节点，需要把所有的deviceId展开并去重
                const idList = site.reduce((acc, current) => {
                    const data: DevInSite = JSON.parse(current);
                    return acc.concat(...data.deviceId);
                }, [] as string[]);
                deviceId = [...new Set(idList)].join(',');
            }
            // console.log(deviceId);
            // onSearch(beginTime, endTime, getTypes(type), deviceId);
        } catch (error) {
            console.warn(error);
        }
        onSearch(beginTime, endTime, getTypes(type), deviceId);
    };

    const onTreeSelectChange = (value: string, label: ReactNode[], extra: any) => {
        // console.log(value);
        // console.log(label);
        // console.log(value);
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
                        style={{ width: '220px' }} />
                </Item>
                <Item
                    name="site"
                    label="设备场所">
                    <TreeSelect
                        treeData={helper.toDeviceDropdown(deviceList)}
                        onChange={onTreeSelectChange}
                        allowClear={true}
                        autoClearSearchValue={false}
                        treeCheckable={true}
                        filterTreeNode={true}
                        // showSearch={true}
                        showCheckedStrategy={TreeSelect.SHOW_PARENT}
                        treeDefaultExpandAll={true}
                        treeLine={true}
                        maxTagCount={3}
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