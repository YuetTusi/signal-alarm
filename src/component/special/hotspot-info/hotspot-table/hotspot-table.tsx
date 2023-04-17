import fs from 'fs';
import path from 'path';
import dayjs, { Dayjs } from 'dayjs';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect } from 'react';
import { App, Divider, message, Table } from 'antd';
import { useModel } from '@/model';
import { Hotspot } from '@/schema/hotspot';
import { helper } from '@/utility/helper';
import { SearchBar } from './search-bar';
import { getColumns } from './column';
import { HotspotTableProp } from './prop';

const { ipcRenderer } = electron;
const { writeFile } = fs.promises;
const { join } = path;

/**
 * 专项检测热点数据
 */
const HotspotTable: FC<HotspotTableProp> = ({ force }) => {

    const { modal } = App.useApp();

    useEffect(() => {
        if (force) {
            querySpecialHotspotData(1, helper.PAGE_SIZE);
        }
    }, [force]);

    const {
        specialHotspotPageIndex,
        specialHotspotPageSize,
        specialHotspotTotal,
        specialHotspotData,
        specialHotspotLoading,
        querySpecialHotspotData,
        exportSpecialHotspotData,
        setReading
    } = useModel(state => ({
        specialHotspotPageIndex: state.specialHotspotPageIndex,
        specialHotspotPageSize: state.specialHotspotPageSize,
        specialHotspotTotal: state.specialHotspotTotal,
        specialHotspotData: state.specialHotspotData,
        specialHotspotLoading: state.specialHotspotLoading,
        querySpecialHotspotData: state.querySpecialHotspotData,
        exportSpecialHotspotData: state.exportSpecialHotspotData,
        setReading: state.setReading
    }));

    /**
     * 翻页Change
     */
    const onPageChange = async (pageIndex: number, pageSize: number) => {
        try {
            await querySpecialHotspotData(pageIndex, pageSize);
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
            await querySpecialHotspotData(1, helper.PAGE_SIZE, {
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
                const data = await exportSpecialHotspotData(specialHotspotPageIndex, specialHotspotPageSize, {
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
            } else {
                setReading(false);
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
        <Table<Hotspot>
            columns={getColumns()}
            dataSource={specialHotspotData}
            loading={specialHotspotLoading}
            pagination={{
                onChange: onPageChange,
                total: specialHotspotTotal,
                current: specialHotspotPageIndex,
                pageSize: specialHotspotPageSize
            }}
            scroll={{ x: 'max-content' }}
            rowKey="id"
        />
    </>
};

HotspotTable.defaultProps = {
    force: false
};

export { HotspotTable };