import { FC, useEffect, useState, useRef, Key, MouseEvent } from 'react';
import { Button, message, Table } from 'antd';
import { AlarmMsg } from '@/schema/alarm-msg';
import { useModel } from '@/model';
import { ProcessModal } from './process-modal';
import { AlarmDetailModal } from './alarm-detail-modal';
import { getTopColumns } from './column';
import { ActionType, AlarmTopProp } from './prop';

let timer: any = null;

/**
 * 预警信息Top10
 */
const AlarmTop: FC<AlarmTopProp> = () => {

    const alarmData = useRef<AlarmMsg>();
    const [processModalOpen, setProcessModalOpen] = useState<boolean>(false);
    const [alarmDetailModalOpen, setAlarmDetailModalOpen] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

    const {
        alarmTop10Loading,
        alarmTop10Data,
        queryAlarmTop10Data,
        processAlarm
    } = useModel(state => ({
        alarmTop10Loading: state.alarmTop10Loading,
        alarmTop10Data: state.alarmTop10Data,
        queryAlarmTop10Data: state.queryAlarmTop10Data,
        processAlarm: state.processAlarm,
    }));

    useEffect(() => {
        queryAlarmTop10Data();
        if (timer === null) {
            timer = setInterval(() => {
                queryAlarmTop10Data();
            }, 1000 * 20);
        }

        return () => {
            clearInterval(timer);
        }
    }, []);

    /**
     * 处理预警消息
     * @param data 当前记录
     * @param remark 处理内容
     */
    const processHandle = async (data: AlarmMsg, remark?: string) => {
        message.destroy();
        try {
            const success = await processAlarm(data.id, 1, remark);
            if (success) {
                await queryAlarmTop10Data();
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
     * 表格命令行handle
     */
    const actionHandle = (action: ActionType, record: AlarmMsg) => {

        switch (action) {
            case ActionType.Process:
                alarmData.current = record;
                setProcessModalOpen(true);
                break;
            case ActionType.Detail:
                alarmData.current = record;
                setAlarmDetailModalOpen(true);
                break;
            default:
                console.log('未知action', action);
                break;
        }
    };

    /**
     * 勾选行Change
     */
    const onRowSelect = (selectedRowKeys: Key[], _: AlarmMsg[]) =>
        setSelectedKeys(selectedRowKeys);

    /**
     * 批量处理Click
     */
    const onBatchProcessClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        message.destroy();
        if (selectedKeys.length === 0) {
            message.info('请选择预警信息');
        } else {
            console.log(selectedKeys);
        }
    };

    return <>
        {/* <p>
            <Button
                onClick={onBatchProcessClick}
                type="link">
                批量处理
            </Button>
        </p> */}
        <Table<AlarmMsg>
            columns={getTopColumns(actionHandle)}
            // rowSelection={{
            //     type: 'checkbox',
            //     onChange: onRowSelect,
            //     selectedRowKeys: selectedKeys
            // }}
            dataSource={alarmTop10Data}
            loading={alarmTop10Loading}
            pagination={{ pageSize: 5 }}
            rowKey="id"
        />
        <ProcessModal
            open={processModalOpen}
            data={alarmData.current}
            onOk={processHandle}
            onCancel={() => setProcessModalOpen(false)} />
        <AlarmDetailModal
            open={alarmDetailModalOpen}
            data={alarmData.current}
            onCancel={() => setAlarmDetailModalOpen(false)} />
    </>
};

export { AlarmTop };