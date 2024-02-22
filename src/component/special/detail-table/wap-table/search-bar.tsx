import dayjs from 'dayjs';
import { FC, useEffect, MouseEvent } from 'react';
import { Col, Row, Form, Button, DatePicker, TreeSelect } from 'antd';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { SearchBarBox } from './styled/box';
import { getTypeSelectSource, getTypes } from './data-source';
import { SearchBarProp } from './prop';

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
                beginTime: dayjs(dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00')),
                endTime: dayjs(dayjs().format('YYYY-MM-DD 23:59:59')),
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
                <Row>
                    <Col>
                        <Item
                            name="beginTime"
                            label="起始时间">
                            <DatePicker
                                showTime={true}
                                allowClear={false}
                                inputReadOnly={true}
                                style={{ width: '270px' }} />
                        </Item>
                    </Col>
                    <Col>
                        <Item
                            name="endTime"
                            label="结束时间">
                            <DatePicker
                                showTime={true}
                                allowClear={false}
                                inputReadOnly={true}
                                style={{ width: '270px' }} />
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Item
                            name="type"
                            label="类型">
                            <TreeSelect
                                treeData={getTypeSelectSource()}
                                treeDefaultExpandAll={true}
                                treeLine={true}
                                listHeight={520}
                                style={{ width: '300px' }} />
                        </Item>
                    </Col>
                    <Col>
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
                                style={{ width: '360px' }} />
                        </Item>
                    </Col>
                    <Col>
                        <Item>
                            <Button
                                onClick={onSubmitClick}
                                type="primary">查询</Button>
                        </Item>
                    </Col>
                </Row>
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