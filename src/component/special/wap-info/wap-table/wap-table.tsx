import fs from 'fs';
import path from 'path';
import dayjs, { Dayjs } from 'dayjs';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect } from 'react';
import { App, Divider, message, Table, Modal } from 'antd';
import { useModel } from '@/model';
import { Wap } from '@/schema/wap';
import { helper } from '@/utility/helper';
import { SearchBar } from './search-bar';
import { getColumns } from './column';
import { WapTableProp } from './prop';

const { ipcRenderer } = electron;
const { writeFile } = fs.promises;
const { join } = path;

/**
 * 专项检测分页数据
 */
const WapTable: FC<WapTableProp> = ({ force }) => {

    const { modal } = App.useApp();

    useEffect(() => {
        if (force) {
            querySpecialWapData(1, helper.PAGE_SIZE);
        }
    }, [force]);

    const {
        specialWapLoading,
        specialWapPageIndex,
        specialWapPageSize,
        specialWapTotal,
        specialWapData,
        querySpecialWapData,
        exportSpecialWapData,
        setReading
    } = useModel(state => ({
        specialWapPageIndex: state.specialWapPageIndex,
        specialWapPageSize: state.specialWapPageSize,
        specialWapTotal: state.specialWapTotal,
        specialWapData: state.specialWapData,
        specialWapLoading: state.specialWapLoading,
        querySpecialWapData: state.querySpecialWapData,
        exportSpecialWapData: state.exportSpecialWapData,
        setReading: state.setReading,
    }));

    /**
     * 翻页Change
     */
    const onPageChange = async (pageIndex: number, pageSize: number) => {
        try {
            await querySpecialWapData(pageIndex, pageSize);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * 查询
     * @param beginTime 起始时间
     * @param endTime 结束时间
     */
    const onSearch = async (beginTime: Dayjs, endTime: Dayjs) => {
        try {
            await querySpecialWapData(1, helper.PAGE_SIZE, {
                beginTime: beginTime.format('YYYY-MM-DD 00:00:00'),
                endTime: endTime.format('YYYY-MM-DD 23:59:59')
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
    const onExport = async (beginTime: Dayjs, endTime: Dayjs) => {
        message.destroy();
        const fileName = '专项数据_' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx';
        setReading(true);
        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke('open-dialog', {
                title: '选择存储目录',
                properties: ['openDirectory']
            });
            if (filePaths.length > 0) {
                const data = await exportSpecialWapData(specialWapPageIndex, specialWapPageSize, {
                    beginTime: beginTime.format('YYYY-MM-DD 00:00:00'),
                    endTime: endTime.format('YYYY-MM-DD 23:59:59')
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
        } finally {
            setReading(false);
        }
    };

    return <>
        <SearchBar
            force={force}
            onExport={onExport}
            onSearch={onSearch} />
        <Divider />
        <Table<Wap>
            columns={getColumns()}
            dataSource={specialWapData}
            loading={specialWapLoading}
            pagination={{
                onChange: onPageChange,
                total: specialWapTotal,
                current: specialWapPageIndex,
                pageSize: specialWapPageSize
            }}
            rowKey="id"
        />
    </>
};

WapTable.defaultProps = {
    force: false
};

export { WapTable };