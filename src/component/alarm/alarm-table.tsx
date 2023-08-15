import fs from 'fs';
import path from 'path';
import electron, { OpenDialogReturnValue } from 'electron';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect } from 'react';
import { App, Divider, Form, message, Table } from 'antd';
import useModel from '@/model';
import { AlarmMsg } from '@/schema/alarm-msg';
import { helper } from '@/utility/helper';
import { SearchBar } from './search-bar';
import { getColumns } from './column';
import { AlarmTopProp, SearchFormValue } from './prop';
import { AlarmTableBox } from './styled/style';

const { join } = path;
const { writeFile } = fs.promises;
const { ipcRenderer } = electron;
const { useForm } = Form;

/**
 * 预警信息分页
 */
const AlarmTable: FC<AlarmTopProp> = () => {

    const { modal } = App.useApp();
    const [formRef] = useForm<SearchFormValue>();

    const {
        alarmLoading,
        alarmPageIndex,
        alarmPageSize,
        alarmTotal,
        alarmData,
        queryAlarmData,
        exportAlarmData,
        setReading
    } = useModel(state => ({
        alarmLoading: state.alarmLoading,
        alarmPageIndex: state.alarmPageIndex,
        alarmPageSize: state.alarmPageSize,
        alarmTotal: state.alarmTotal,
        alarmData: state.alarmData,
        queryAlarmData: state.queryAlarmData,
        exportAlarmData: state.exportAlarmData,
        setReading: state.setReading
    }));

    useEffect(() => {
        const { beginTime, endTime, status } = formRef.getFieldsValue();
        queryAlarmData(1, helper.PAGE_SIZE, {
            beginTime: beginTime.format('YYYY-MM-DD 00:00:00'),
            endTime: endTime.format('YYYY-MM-DD 23:59:59'),
            status
        });
    }, []);


    /**
     * 查询
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param status 状态(-1:全部 0:待处理 1:已处理)
     */
    const onSearch = async (beginTime: Dayjs, endTime: Dayjs, status: number) => {
        try {
            await queryAlarmData(1, helper.PAGE_SIZE, {
                beginTime: beginTime.format('YYYY-MM-DD 00:00:00'),
                endTime: endTime.format('YYYY-MM-DD 23:59:59'),
                status
            });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param status 状态(-1:全部 0:待处理 1:已处理)
     */
    const onExport = async (beginTime: Dayjs, endTime: Dayjs, status: number) => {
        message.destroy();
        const fileName = '预警数据_' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx';
        setReading(true);
        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke('open-dialog', {
                title: '选择存储目录',
                properties: ['openDirectory']
            });
            if (filePaths.length > 0) {
                const data = await exportAlarmData(alarmPageIndex, alarmPageSize, {
                    beginTime: beginTime.format('YYYY-MM-DD 00:00:00'),
                    endTime: endTime.format('YYYY-MM-DD 23:59:59'),
                    status
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

    /**
     * 翻页Change
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     */
    const onPageChange = async (pageIndex: number, pageSize: number) => {
        const { beginTime, endTime, status } = formRef.getFieldsValue();
        try {
            queryAlarmData(pageIndex, pageSize, {
                beginTime: beginTime.format('YYYY-MM-DD 00:00:00'),
                endTime: endTime.format('YYYY-MM-DD 23:59:59'),
                status
            });
        } catch (error) {
            console.warn(error);
        }
    };

    return <AlarmTableBox>
        <SearchBar
            formRef={formRef}
            onExport={onExport}
            onSearch={onSearch} />
        <Divider />
        <Table<AlarmMsg>
            columns={getColumns()}
            pagination={{
                onChange: onPageChange,
                current: alarmPageIndex,
                pageSize: alarmPageSize,
                total: alarmTotal,
                showSizeChanger: false
            }}
            dataSource={alarmData}
            loading={alarmLoading}
            scroll={{ x: 'max-content' }}
            rowKey="id"
        />
    </AlarmTableBox>;
};

export { AlarmTable };