import fs from 'fs';
import path from 'path';
import dayjs, { Dayjs } from 'dayjs';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect } from 'react';
import { App, message, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useModel } from '@/model';
import { Terminal } from '@/schema/terminal';
import { Protocol } from '@/schema/protocol';
import { helper } from '@/utility/helper';
import { SearchBar } from './search-bar';
import { getColumns } from './column';
import { getTypes } from './data-source';
import { SearchFormValue, TerminalTableProp } from './prop';

const { ipcRenderer } = electron;
const { writeFile } = fs.promises;
const { join } = path;

/**
 * 专项检测终端数据
 */
const TerminalTable: FC<TerminalTableProp> = () => {

    const { modal } = App.useApp();
    const [formRef] = useForm<SearchFormValue>();

    useEffect(() => {
        querySpecialTerminalData(1, helper.PAGE_SIZE, {
            beginTime: dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00'),
            endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
            type: helper.protocolToString([
                Protocol.WiFi24G,
                Protocol.WiFi58G
            ])
        });
    }, []);

    const {
        specialTerminalPageIndex,
        specialTerminalPageSize,
        specialTerminalTotal,
        specialTerminalData,
        specialTerminalLoading,
        querySpecialTerminalData,
        exportSpecialTerminalData
    } = useModel(state => ({
        specialTerminalPageIndex: state.specialTerminalPageIndex,
        specialTerminalPageSize: state.specialTerminalPageSize,
        specialTerminalTotal: state.specialTerminalTotal,
        specialTerminalData: state.specialTerminalData,
        specialTerminalLoading: state.specialTerminalLoading,
        querySpecialTerminalData: state.querySpecialTerminalData,
        exportSpecialTerminalData: state.exportSpecialTerminalData
    }));

    /**
     * 翻页Change
     */
    const onPageChange = async (pageIndex: number, pageSize: number) => {
        const { beginTime, endTime, type, site } = formRef.getFieldsValue();
        try {
            await querySpecialTerminalData(pageIndex, pageSize, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                type: getTypes(type),
                deviceId: helper.getDeviceIdFromDropdown(site)
                // connect
            });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 查询
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param type 枚举
     */
    const onSearch = async (beginTime: Dayjs, endTime: Dayjs, type: string, deviceId?: string) => {
        try {
            await querySpecialTerminalData(1, helper.PAGE_SIZE, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                type,
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
     */
    const onExport = async (beginTime: Dayjs, endTime: Dayjs, type: string, deviceId?: string) => {
        message.destroy();
        const fileName = '专项数据_' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx';
        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke('open-dialog', {
                title: '选择存储目录',
                properties: ['openDirectory']
            });
            if (filePaths.length > 0) {
                const data = await exportSpecialTerminalData(specialTerminalPageIndex, specialTerminalPageSize, {
                    beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                    endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                    type,
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
        <Table<Terminal>
            columns={getColumns()}
            dataSource={specialTerminalData}
            loading={specialTerminalLoading}
            pagination={{
                onChange: onPageChange,
                total: specialTerminalTotal,
                current: specialTerminalPageIndex,
                pageSize: specialTerminalPageSize,
                showSizeChanger: false,
                showTotal: (total) => `共${total}条`
            }}
            scroll={{ x: 'max-content' }}
            rowKey="id"
        />
    </>
};

TerminalTable.defaultProps = {};

export { TerminalTable };