import fs from 'fs';
import path from 'path';
import dayjs, { Dayjs } from 'dayjs';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect } from 'react';
import { App, message, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useModel } from '@/model';
import { Wap } from '@/schema/wap';
import { helper } from '@/utility/helper';
import { SearchBar } from './search-bar';
import { getColumns } from './column';
import { SearchFormValue, OthersTableProp } from './prop';

const { ipcRenderer } = electron;
const { writeFile } = fs.promises;
const { join } = path;

/**
 * 专项检测其他数据
 */
const OthersTable: FC<OthersTableProp> = () => {

    const { modal } = App.useApp();
    const [formRef] = useForm<SearchFormValue>();

    useEffect(() => {
        querySpecialOthersData(1, helper.PAGE_SIZE, {
            beginTime: dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00'),
            endTime: dayjs().format('YYYY-MM-DD 23:59:59')
        });
    }, []);

    const {
        specialOthersPageIndex,
        specialOthersPageSize,
        specialOthersTotal,
        specialOthersData,
        specialOthersLoading,
        querySpecialOthersData,
        exportSpecialOthersData
    } = useModel(state => ({
        specialOthersPageIndex: state.specialOthersPageIndex,
        specialOthersPageSize: state.specialOthersPageSize,
        specialOthersTotal: state.specialOthersTotal,
        specialOthersData: state.specialOthersData,
        specialOthersLoading: state.specialOthersLoading,
        querySpecialOthersData: state.querySpecialOthersData,
        exportSpecialOthersData: state.exportSpecialOthersData
    }));

    /**
     * 翻页Change
     */
    const onPageChange = async (pageIndex: number, pageSize: number) => {
        const { beginTime, endTime, site } = formRef.getFieldsValue();
        try {
            await querySpecialOthersData(pageIndex, pageSize, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                deviceId: helper.getDeviceIdFromDropdown(site)
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
    const onSearch = async (beginTime: Dayjs, endTime: Dayjs, deviceId?: string) => {
        try {
            await querySpecialOthersData(1, helper.PAGE_SIZE, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                deviceId
            });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param deviceId 场所设备
     */
    const onExport = async (beginTime: Dayjs, endTime: Dayjs, deviceId?: string) => {
        message.destroy();
        const fileName = '专项数据_' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx';
        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke('open-dialog', {
                title: '选择存储目录',
                properties: ['openDirectory']
            });
            if (filePaths.length > 0) {
                const data = await exportSpecialOthersData(specialOthersPageIndex, specialOthersPageSize, {
                    beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                    endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                    deviceId
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
        <Table<Wap>
            columns={getColumns()}
            dataSource={specialOthersData}
            loading={specialOthersLoading}
            pagination={{
                onChange: onPageChange,
                total: specialOthersTotal,
                current: specialOthersPageIndex,
                pageSize: specialOthersPageSize,
                showSizeChanger: false,
                showTotal: (total) => `共${total}条`
            }}
            scroll={{ x: 'max-content' }}
            rowKey="id"
        />
    </>
};

OthersTable.defaultProps = {};

export { OthersTable };