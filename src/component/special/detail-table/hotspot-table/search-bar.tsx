import { FC, MouseEvent } from 'react';
import { Col, Row, Form, Button, Input, DatePicker, TreeSelect } from 'antd';
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

    /**
     * 查询Click
     */
    const onSubmitClick = (event: MouseEvent) => {
        event.preventDefault();
        const {
            beginTime, endTime, hotspotName, mac, type, site
        } = formRef.getFieldsValue();
        const deviceId = helper.getDeviceIdFromDropdown(site);
        onSearch(beginTime, endTime, hotspotName, mac, getTypes(type), deviceId);
    };

    /**
     * 导出Click
     */
    const onExportClick = (event: MouseEvent) => {
        event.preventDefault();
        const {
            beginTime, endTime, hotspotName, type, site
        } = formRef.getFieldsValue();
        const deviceId = helper.getDeviceIdFromDropdown(site);
        onExport(beginTime, endTime, hotspotName, getTypes(type), deviceId);
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
                            name="hotspotName"
                            label="热点名称">
                            <Input />
                        </Item>
                    </Col>
                    <Col>
                        <Item
                            name="mac"
                            label="MAC地址">
                            <Input style={{ width: 220 }} />
                        </Item>
                    </Col>
                    <Col>
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
                                style={{ width: '300px' }} />
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
                disabled={specialHotspotTotal === 0}
                type="primary">导出</Button>
        </div>
    </SearchBarBox>
};

export { SearchBar };