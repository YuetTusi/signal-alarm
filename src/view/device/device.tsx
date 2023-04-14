import { FC, useEffect, useState, useRef, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Input, Button, Select, Form, Table, message } from 'antd';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { ComDevice, DeviceState } from '@/schema/com-device';
import { AddModal } from './add-modal';
import { SetModal } from './set-modal';
import { getColumns } from './column';
import { DeviceBox, SearchBar, TableBox } from './styled/box';
import { ActionType, DeviceProp, FormValue } from './prop';
import { SetFormValue } from './set-modal/prop';

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * 设备管理页
 */
const Device: FC<DeviceProp> = () => {

    const navitagte = useNavigate();
    const { modal } = App.useApp();
    const [formRef] = useForm<FormValue>();
    const editData = useRef<ComDevice>();
    const setData = useRef<ComDevice>();
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [setModalOpen, setSetModalOpen] = useState<boolean>(false);

    const {
        deviceData,
        deviceLoading,
        devicePageIndex,
        devicePageSize,
        deviceTotal,
        queryDeviceData,
        addDevice,
        deleteDevice,
        updateDevice,
        setDevice
    } = useModel(state => ({
        deviceData: state.deviceData,
        deviceLoading: state.deviceLoading,
        devicePageIndex: state.devicePageIndex,
        devicePageSize: state.devicePageSize,
        deviceTotal: state.deviceTotal,
        queryDeviceData: state.queryDeviceData,
        addDevice: state.addDevice,
        deleteDevice: state.deleteDevice,
        updateDevice: state.updateDevice,
        setDevice: state.setDevice
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
            case ActionType.Edit:
                editData.current = data;
                setAddModalOpen(true);
                break;
            case ActionType.Set:
                setData.current = data;
                setSetModalOpen(true);
            default:
                console.log(action);
                break;
        }
    };

    /**
     * 添加/编辑保存
     * @param data 
     */
    const onSave = async (data: ComDevice) => {

        message.destroy();
        try {
            if (editData.current === undefined) {
                const res = await addDevice(data);
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
            } else {
                const res = await updateDevice(data);
                if (res === null) {
                    message.warning('编辑失败');
                } else if (res.code === 200) {
                    setAddModalOpen(false);
                    formRef.resetFields();
                    editData.current = undefined;
                    await queryDeviceData(1, helper.PAGE_SIZE);
                    message.success('编辑成功');
                } else {
                    message.warning(`编辑失败(${res.message})`);
                }
            }
        } catch (error) {
            message.warning(error.message);
        }
    };

    /**
     * 下发
     * @param values 表单
     */
    const onSet = async ({ su }: SetFormValue) => {
        message.destroy();
        if (setData.current) {
            try {
                const res = await setDevice(setData.current, su);
                if (res !== null && res.code === 200) {
                    await queryDeviceData(1, helper.PAGE_SIZE);
                    setSetModalOpen(false);
                    setData.current = undefined;
                    message.success('下发成功');
                } else {
                    message.warning(`下发失败(${res?.message ?? ''})`);
                }
            } catch (error) {
                message.warning(`下发失败(${error.message})`);
            }
        }
    }

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
            data={editData.current}
            onOk={onSave}
            onCancel={() => {
                editData.current = undefined;
                setAddModalOpen(false);
            }} />
        <SetModal
            open={setModalOpen}
            data={setData.current!}
            onOk={onSet}
            onCancel={() => {
                setData.current = undefined;
                setSetModalOpen(false);
            }}
        />
    </DeviceBox>;
};

export { Device };