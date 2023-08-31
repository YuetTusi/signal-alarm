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
import { SearchFormValue, CameraTableProp } from './prop';


const { ipcRenderer } = electron;
const { writeFile } = fs.promises;
const { join } = path;

/**
 * 专项检测摄像头数据
 */
const CameraTable: FC<CameraTableProp> = () => {

    const { modal } = App.useApp();
    const [formRef] = useForm<SearchFormValue>();

    useEffect(() => {
        querySpecialCameraData(1, helper.PAGE_SIZE, {
            beginTime: dayjs().add(-1, 'M').format('YYYY-MM-DD HH:mm:ss'),
            endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
        });
    }, []);

    const {
        specialCameraPageIndex,
        specialCameraPageSize,
        specialCameraTotal,
        specialCameraData,
        specialCameraLoading,
        querySpecialCameraData,
        exportSpecialCameraData
    } = useModel(state => ({
        specialCameraPageIndex: state.specialCameraPageIndex,
        specialCameraPageSize: state.specialCameraPageSize,
        specialCameraTotal: state.specialCameraTotal,
        specialCameraData: state.specialCameraData,
        specialCameraLoading: state.specialCameraLoading,
        querySpecialCameraData: state.querySpecialCameraData,
        exportSpecialCameraData: state.exportSpecialCameraData
    }));

    /**
     * 翻页Change
     */
    const onPageChange = async (pageIndex: number, pageSize: number) => {
        const { beginTime, endTime } = formRef.getFieldsValue();
        try {
            await querySpecialCameraData(pageIndex, pageSize, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss')
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
    const onSearch = async (beginTime: Dayjs, endTime: Dayjs) => {
        try {
            await querySpecialCameraData(1, helper.PAGE_SIZE, {
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss')
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
        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke('open-dialog', {
                title: '选择存储目录',
                properties: ['openDirectory']
            });
            if (filePaths.length > 0) {
                const data = await exportSpecialCameraData(specialCameraPageIndex, specialCameraPageSize, {
                    beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                    endTime: endTime.format('YYYY-MM-DD HH:mm:ss')
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
            dataSource={specialCameraData}
            loading={specialCameraLoading}
            pagination={{
                onChange: onPageChange,
                total: specialCameraTotal,
                current: specialCameraPageIndex,
                pageSize: specialCameraPageSize,
                showSizeChanger: false
            }}
            scroll={{ x: 'max-content' }}
            rowKey="id"
        />
    </>
};

CameraTable.defaultProps = {};

export { CameraTable };