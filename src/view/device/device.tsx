import { FC, useEffect, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Input, Button, Select, Form, Table, message } from 'antd';
import { useModel } from '@/model';
import { request } from '@/utility/http';
import { helper } from '@/utility/helper';
import { ComDevice, DeviceState } from '@/schema/com-device';
import { AddModal } from './add-modal';
import { getColumns } from './column';
import { DeviceBox, SearchBar, TableBox } from './styled/box';
import { ActionType, DeviceProp, FormValue } from './prop';

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * 设备管理页
 */
const Device: FC<DeviceProp> = () => {

    const navitagte = useNavigate();
    const { modal } = App.useApp();
    const [formRef] = useForm<FormValue>();
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

    const {
        deviceData,
        deviceLoading,
        devicePageIndex,
        devicePageSize,
        deviceTotal,
        queryDeviceData,
        addDevice,
        deleteDevice
    } = useModel(state => ({
        deviceData: state.deviceData,
        deviceLoading: state.deviceLoading,
        devicePageIndex: state.devicePageIndex,
        devicePageSize: state.devicePageSize,
        deviceTotal: state.deviceTotal,
        queryDeviceData: state.queryDeviceData,
        addDevice: state.addDevice,
        deleteDevice: state.deleteDevice
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
        switch (action) {
            case ActionType.Delete:
                modal.confirm({
                    async onOk() {
                        message.destroy();
                        try {
                            const res = await deleteDevice(data.id.toString());
                            if (res === null) {
                                message.warning('删除失败');
                            } else if (res.code === 200) {
                                await queryDeviceData(1, helper.PAGE_SIZE);
                                message.success('删除成功');
                            } else {
                                message.warning(`删除失败(${res.message})`);
                            }
                        } catch (error) {
                            message.warning(`删除失败(${error.message})`);
                        }
                    },
                    centered: true,
                    title: '删除',
                    content: `确认删除「${data.deviceName ?? ''}」？`,
                    okText: '是',
                    cancelText: '否'
                });
                break;
            default:
                console.log(action);
                break;
        }
    };

    /**
     * 添加保存
     * @param data 
     */
    const onAddSave = async (data: ComDevice) => {

        message.destroy();
        try {
            const res = await addDevice(data);
            console.log(res);
            if (res === null) {
                message.warning('添加失败');
            } else if (res.code === 200) {
                setAddModalOpen(false);
                formRef.resetFields();
                await queryDeviceData(1, helper.PAGE_SIZE);
                message.success('添加成功');
            } else {
                message.warning(`添加失败(${res.message})`);
            }
        } catch (error) {
            message.warning(error.message);
        }
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
                <Button onClick={() => {
                    request.get(`/devops/device/1/1000000000000000000`).then(res => console.log(res));
                }}>
                    list
                </Button>
                <Button
                    onClick={() => setAddModalOpen(true)}
                    type="primary">
                    添加设备
                </Button>
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
        <AddModal
            open={addModalOpen}
            onOk={onAddSave}
            onCancel={() => setAddModalOpen(false)} />
    </DeviceBox>;
};

export { Device };