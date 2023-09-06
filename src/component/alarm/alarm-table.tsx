import fs from 'fs';
import path from 'path';
import electron, { OpenDialogReturnValue } from 'electron';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState, useRef } from 'react';
import { Key } from 'antd/es/table/interface';
import { App, Divider, Form, message, Table } from 'antd';
import useModel from '@/model';
import { AlarmMsg } from '@/schema/alarm-msg';
import { helper } from '@/utility/helper';
import { SearchBar } from './search-bar';
import { getColumns } from './column';
import { ActionType, AlarmTopProp, SearchFormValue } from './prop';
import { AlarmTableBox } from './styled/style';
import { ProcessModal } from './process-modal';
import { AlarmDetailModal } from './alarm-detail-modal';
import { BatchModal } from './batch-modal';

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
    const currentData = useRef<AlarmMsg>();
    const selectedRows = useRef<AlarmMsg[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
    const [processModalOpen, setProcessModalOpen] = useState<boolean>(false);
    const [batchModalOpen, setBatchModalOpen] = useState<boolean>(false);
    const [alarmDetailModalOpen, setAlarmDetailModalOpen] = useState<boolean>(false);

    const {
        alarmLoading,
        alarmPageIndex,
        alarmPageSize,
        alarmTotal,
        alarmData,
        queryAlarmData,
        exportAlarmData,
        processAlarm,
        batchProcessAlarm,
        setReading
    } = useModel(state => ({
        alarmLoading: state.alarmLoading,
        alarmPageIndex: state.alarmPageIndex,
        alarmPageSize: state.alarmPageSize,
        alarmTotal: state.alarmTotal,
        alarmData: state.alarmData,
        queryAlarmData: state.queryAlarmData,
        exportAlarmData: state.exportAlarmData,
        processAlarm: state.processAlarm,
        batchProcessAlarm: state.batchProcessAlarm,
        setReading: state.setReading
    }));

    useEffect(() => {
        const { beginTime, endTime, status } = formRef.getFieldsValue();
        queryAlarmData(1, helper.PAGE_SIZE, {
            beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
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
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
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
                    beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                    endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
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
                beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                status
            });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 勾选行Change
     */
    const onRowSelect = (selectedRowKeys: Key[], data: AlarmMsg[]) => {
        selectedRows.current = data;
        setSelectedKeys(selectedRowKeys);
    };

    /**
     * 批量处理Click
     */
    const onBatchProcessClick = (ids: number[], status: number, remark: string) => {
        message.destroy();
        if (selectedKeys.length === 0) {
            message.info('请选择预警信息');
        } else {
            setBatchModalOpen(true);
        }
    };

    /**
     * 表格命令行handle
     */
    const actionHandle = (action: ActionType, record: AlarmMsg) => {

        switch (action) {
            case ActionType.Process:
                currentData.current = record;
                setProcessModalOpen(true);
                break;
            case ActionType.Detail:
                currentData.current = record;
                setAlarmDetailModalOpen(true);
                break;
            default:
                console.log('未知action', action);
                break;
        }
    };

    /**
     * 处理预警消息
     * @param data 当前记录
     * @param remark 处理内容
     */
    const processHandle = async (data: AlarmMsg, remark?: string) => {
        message.destroy();
        const { getFieldsValue } = formRef;
        try {
            const success = await processAlarm(data.id, 1, remark);
            const { beginTime, endTime, status } = getFieldsValue();
            if (success) {
                await queryAlarmData(1, helper.PAGE_SIZE, {
                    beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                    endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                    status
                });
                message.success('处理成功');
            } else {
                message.success('处理失败');
            }
        } catch (error) {
            message.warning(`处理失败（${error.message}）`);
        }
        setProcessModalOpen(false);
    };

    /**
     * 批量处理预警消息
     * @param data 勾选记录
     * @param remark 处理内容
     */
    const batchHandle = async (data: AlarmMsg[], remark?: string) => {
        message.destroy();
        const { getFieldsValue } = formRef;
        try {
            const success = await batchProcessAlarm(data.map(item => item.id), 1, remark);
            const { beginTime, endTime, status } = getFieldsValue();
            if (success) {
                await queryAlarmData(1, helper.PAGE_SIZE, {
                    beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
                    endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
                    status
                });
                selectedRows.current = [];
                setSelectedKeys([]);
                message.success('处理成功');
            } else {
                message.success('处理失败');
            }
        } catch (error) {
            message.warning(`处理失败（${error.message}）`);
        }
        setBatchModalOpen(false);
    };

    return <>
        <AlarmTableBox>
            <SearchBar
                formRef={formRef}
                selectedKeys={selectedKeys}
                onBatch={onBatchProcessClick}
                onExport={onExport}
                onSearch={onSearch} />
            <Divider />
            <Table<AlarmMsg>
                columns={getColumns(actionHandle)}
                pagination={{
                    onChange: onPageChange,
                    current: alarmPageIndex,
                    pageSize: alarmPageSize,
                    total: alarmTotal,
                    showSizeChanger: true,
                    showTotal: (total) => `共${total}条`
                }}
                rowSelection={{
                    type: 'checkbox',
                    onChange: onRowSelect,
                    selectedRowKeys: selectedKeys,
                    getCheckboxProps: (record) => ({ disabled: record.status === 1 })
                }}
                dataSource={alarmData}
                loading={alarmLoading}
                scroll={{ x: 'max-content', y: 390 }}
                rowKey="id"
            />
        </AlarmTableBox>
        <ProcessModal
            open={processModalOpen}
            data={currentData.current}
            onOk={processHandle}
            onCancel={() => setProcessModalOpen(false)} />
        <AlarmDetailModal
            open={alarmDetailModalOpen}
            data={currentData.current}
            onCancel={() => setAlarmDetailModalOpen(false)} />
        <BatchModal
            open={batchModalOpen}
            data={selectedRows.current}
            onOk={batchHandle}
            onCancel={() => {
                setBatchModalOpen(false);
            }} />
    </>;
};

export { AlarmTable };