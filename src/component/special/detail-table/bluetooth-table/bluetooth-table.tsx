import fs from 'fs';
import path from 'path';
import dayjs, { Dayjs } from 'dayjs';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect } from 'react';
import { App, message, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useModel } from '@/model';
import { Terminal } from '@/schema/terminal';
import { helper } from '@/utility/helper';
import { SearchBar } from './search-bar';
import { getColumns } from './column';
import { SearchFormValue, BluetoothTableProp } from './prop';


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
        querySpecialBluetoothData,
        exportSpecialBluetoothData
    } = useModel(state => ({
        specialBluetoothPageIndex: state.specialBluetoothPageIndex,
        specialBluetoothPageSize: state.specialBluetoothPageSize,
        specialBluetoothTotal: state.specialBluetoothTotal,
        specialBluetoothData: state.specialBluetoothData,
        specialBluetoothLoading: state.specialBluetoothLoading,
        querySpecialBluetoothData: state.querySpecialBluetoothData,
        exportSpecialBluetoothData: state.exportSpecialBluetoothData
    }));

    console.log(specialBluetoothData);
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

    return <>
        <SearchBar
            formRef={formRef}
            onExport={onExport}
            onSearch={onSearch} />
        <Table<Terminal>
            columns={getColumns()}
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
        />
    </>
};

BluetoothTable.defaultProps = {};

export { BluetoothTable };