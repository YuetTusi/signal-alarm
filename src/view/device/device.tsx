import { FC, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Select, Form, Table } from 'antd';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { getColumns } from './column';
import { ActionType, DeviceProp, FormValue } from './prop';
import { ComDevice, DeviceState } from '@/schema/com-device';
import { DeviceBox, SearchBar, TableBox } from './styled/box';

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * 设备管理页
 */
const Device: FC<DeviceProp> = () => {

    const navitagte = useNavigate();
    const [formRef] = useForm<FormValue>();

    const {
        deviceData,
        deviceLoading,
        devicePageIndex,
        devicePageSize,
        deviceTotal,
        queryDeviceData
    } = useModel(state => ({
        deviceData: state.deviceData,
        deviceLoading: state.deviceLoading,
        devicePageIndex: state.devicePageIndex,
        devicePageSize: state.devicePageSize,
        deviceTotal: state.deviceTotal,
        queryDeviceData: state.queryDeviceData,
    }));

    useEffect(() => {

        queryDeviceData(1, helper.PAGE_SIZE);
    }, []);

    /**
     * 查询Click
     */
    const onSearchClick = (event: MouseEvent) => {
        event.preventDefault();
        const { getFieldsValue } = formRef;
        const values = getFieldsValue();
        console.log(values);
        queryDeviceData(1, helper.PAGE_SIZE, values);
    };

    /**
     * 返回Click
     */
    const onGoBackClick = (event: MouseEvent) => {
        event.preventDefault();
        navitagte('/dashboard');
    };

    /**
     * 翻页Change
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     */
    const onPageChange = (pageIndex: number, pageSize: number = helper.PAGE_SIZE) => {
        queryDeviceData(pageIndex, pageSize);
    };

    /**
     * 行功能点击Handle
     * @param action 功能
     * @param data 行数据
     */
    const rowClickHandle = (action: ActionType, data: ComDevice) => {
        console.log(action, data);
    };

    return <DeviceBox>
        <SearchBar>
            <div>
                <Form form={formRef} layout="inline">
                    <Item
                        name="deviceName"
                        label="设备名称">
                        <Input />
                    </Item>
                    <Item
                        name="status"
                        label="状态"
                        initialValue={-1}
                        style={{ width: '120px' }}>
                        <Select>
                            <Option value={-1}>全部</Option>
                            <Option value={DeviceState.Normal}>工作</Option>
                            <Option value={DeviceState.Abnormal}>异常</Option>
                        </Select>
                    </Item>
                    <Item>
                        <Button
                            onClick={onSearchClick}
                            type="primary">查询</Button>
                    </Item>
                    <Item>
                        <Button
                            onClick={onGoBackClick}
                            type="default">返回主页</Button>
                    </Item>
                </Form>
            </div>
            <div>
                <Button type="primary">添加设备</Button>
            </div>
        </SearchBar>
        <TableBox>
            <Table
                columns={getColumns(rowClickHandle)}
                dataSource={deviceData}
                loading={deviceLoading}
                rowKey="id"
                pagination={{
                    onChange: onPageChange,
                    current: devicePageIndex,
                    pageSize: devicePageSize,
                    total: deviceTotal
                }}
            />
        </TableBox>
    </DeviceBox>;
};

export { Device };