import fs from 'fs';
import path from 'path';
import dayjs, { Dayjs } from 'dayjs';
import debounce from 'lodash/debounce';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect } from 'react';
import { App, message, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useModel } from '@/model';
import { Bluetooth } from '@/schema/bluetooth';
import { helper } from '@/utility/helper';
import { SearchBar } from './search-bar';
import { getColumns } from './column';
import { SearchFormValue, BluetoothTableProp, ActionType } from './prop';
import { WhiteListType } from '@/schema/white-list';


const { ipcRenderer } = electron;
const { writeFile } = fs.promises;
const { join } = path;

/**
 * 专项检测蓝牙数据
 */
const BluetoothTable: FC<BluetoothTableProp> = () => {

    const { modal } = App.useApp();
    const [formRef] = useForm<SearchFormValue>();

    useEffect(() => {
        querySpecialBluetoothData(1, helper.PAGE_SIZE, {
            beginTime: dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00'),
            endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
            bluetoothType: 'all'
        });
    }, []);

    const {
        specialBluetoothPageIndex,
        specialBluetoothPageSize,
        specialBluetoothTotal,
        specialBluetoothData,
        specialBluetoothLoading,
        addWhiteList,
        querySpecialBluetoothData,
        exportSpecialBluetoothData
    } = useModel(state => ({
        specialBluetoothPageIndex: state.specialBluetoothPageIndex,
        specialBluetoothPageSize: state.specialBluetoothPageSize,
        specialBluetoothTotal: state.specialBluetoothTotal,
        specialBluetoothData: state.specialBluetoothData,
        specialBluetoothLoading: state.specialBluetoothLoading,
        addWhiteList: state.addWhiteList,
        querySpecialBluetoothData: state.querySpecialBluetoothData,
        exportSpecialBluetoothData: state.exportSpecialBluetoothData
    }));

    /**
     * 翻页Change
     */
    const onPageChange = async (pageIndex: number, pageSize: number) => {
        const { beginTime, endTime, bluetoothType } = formRef.getFieldsValue();
        try {
            await querySpecialBluetoothData(pageIndex, pageSize, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                bluetoothType
            });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 查询
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param deviceId 场所设备
     */
    const onSearch = async (beginTime: Dayjs, endTime: Dayjs, bluetoothType: string) => {
        try {
            await querySpecialBluetoothData(1, helper.PAGE_SIZE, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                bluetoothType
            });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param bluetoothType 设备id
     */
    const onExport = async (beginTime: Dayjs, endTime: Dayjs, bluetoothType?: string) => {
        message.destroy();
        const fileName = '专项数据_' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx';
        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke('open-dialog', {
                title: '选择存储目录',
                properties: ['openDirectory']
            });
            if (filePaths.length > 0) {
                const data = await exportSpecialBluetoothData(specialBluetoothPageIndex, specialBluetoothPageSize, {
                    beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                    endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                    bluetoothType
                });
                await writeFile(join(filePaths[0], fileName), data);
                modal.success({
                    title: '导出成功',
                    content: `数据文件「${fileName}」已保存在${filePaths[0]}`,
                    centered: true,
                    okText: '确定'
                });
            }
        } catch (error) {
            console.warn(error);
            message.warning(`导出失败（${error.message}）`);
        }
    };


    /**
     * 表格列Click
     */
    const onColumnClick = debounce(async (actionType: ActionType, data: Bluetooth) => {

        message.destroy();
        switch (actionType) {
            case ActionType.AddToWhiteList:
                modal.confirm({
                    async onOk() {
                        try {
                            const res = await addWhiteList({
                                type: WhiteListType.MAC,
                                mac: data.mac,
                                status: 0,
                                startFreq: '',
                                endFreq: ''
                            });
                            if (res !== null && res.code === 200) {
                                message.success('成功添加至白名单');
                            } else {
                                message.warning('添加失败');
                            }
                        } catch (error) {
                            console.warn(error);
                            message.warning(`添加失败 ${error.message}`);
                        }
                    },
                    centered: true,
                    title: '白名单',
                    content: `确认将「${data.type === 'ble' ? '低功耗蓝牙' : '经典蓝牙'} ${data.mac}」加入白名单？`,
                    okText: '是',
                    cancelText: '否'
                });
                break;
            default:
                break;
        }
    }, 500, { leading: true, trailing: false });

    return <>
        <SearchBar
            formRef={formRef}
            onExport={onExport}
            onSearch={onSearch} />
        <Table<Bluetooth>
            columns={getColumns(onColumnClick)}
            dataSource={specialBluetoothData}
            loading={specialBluetoothLoading}
            pagination={{
                onChange: onPageChange,
                total: specialBluetoothTotal,
                current: specialBluetoothPageIndex,
                pageSize: specialBluetoothPageSize,
                showSizeChanger: false,
                showTotal: (total) => `共${total}条`
            }}
            scroll={{ x: 'max-content' }}
            rowKey="id"
            size="middle"
        />
    </>
};

BluetoothTable.defaultProps = {};

export { BluetoothTable };