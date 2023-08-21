import { FC, useEffect, useState, useRef } from 'react';
import { message, Table } from 'antd';
import { AlarmMsg } from '@/schema/alarm-msg';
import { useModel } from '@/model';
import { ProcessModal } from './process-modal';
import { AlarmDetailModal } from './alarm-detail-modal';
import { getTopColumns } from './column';
import { ActionType, AlarmTopProp } from './prop';

/**
 * 预警信息Top10
 */
const AlarmTop: FC<AlarmTopProp> = () => {

    const alarmData = useRef<AlarmMsg>();
    const [processModalOpen, setProcessModalOpen] = useState<boolean>(false);
    const [alarmDetailModalOpen, setAlarmDetailModalOpen] = useState<boolean>(false);

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
    }, []);

    // const onResize = debounce((event: electron.IpcRendererEvent, rect: electron.Rectangle) => {
    //     (async () => {
    //         document.querySelector('#target')!.innerHTML = '';
    //         await queryAlarmTop10Data();
    //     })();

    //     console.log('renderer');
    // }, 100, { leading: true, trailing: false });

    // useResize(onResize);

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

    return <>
        <Table<AlarmMsg>
            columns={getTopColumns(actionHandle)}
            sticky={{
                offsetHeader: 0
            }}
            dataSource={alarmTop10Data}
            loading={alarmTop10Loading}
            pagination={false}
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