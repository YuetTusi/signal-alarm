import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import electron from 'electron';
import { MouseEvent } from 'react';
import { Button, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { QuickCheckReport } from '@/schema/quick-check-report';
import { log } from '@/utility/log';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';

const { basename, join } = path;
const { mkdir, writeFile } = fs.promises;
const { ipcRenderer } = electron;

const getColumns = (onDownload: (report: QuickCheckReport) => void) => [{
    title: '报告ID',
    key: 'reportId',
    dataIndex: 'reportId',
    render: (val: string, record) => <Button onClick={async (_: MouseEvent<HTMLElement>) => {
        const fileName = basename(record.url, '.pdf');
        try {
            const exist = await helper.existFile('C:/_signal_tmp');
            if (!exist) {
                await mkdir('C:/_signal_tmp');
            }
            const chunk = await request.attachment(record.url);
            const pdf = join('C:/_signal_tmp', fileName + '.pdf');
            await writeFile(pdf, chunk);
            // shell.openExternal(pdf, {
            //     activate: true
            // });
            ipcRenderer.send('report', fileName + '.pdf');
        } catch (error) {
            log.error(`打开pdf报告失败 @component/check-report/column/getColumns:${error.message}`);
            message.destroy();
            message.warning('查看报告失败');
        }
    }}
        disabled={helper.isNullOrUndefined(record.url)}
        type="link">{val}</Button>
}, {
    title: '任务ID',
    key: 'taskId',
    dataIndex: 'taskId'
}, {
    title: '开始时间',
    key: 'startTime',
    dataIndex: 'startTime',
    align: 'center',
    width: 150,
    render: (val: number) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}, {
    title: '持续时间',
    key: 'sec',
    dataIndex: 'sec',
    align: 'center',
    width: 80,
    render: (_: any, { startTime, endTime }) => {
        const diff = dayjs(endTime).diff(startTime);
        return dayjs('00:00:00', 'HH:mm:ss').add(diff, 'ms').format('HH:mm:ss')
    }
}, {
    title: '结束时间',
    key: 'endTime',
    dataIndex: 'endTime',
    align: 'center',
    width: 150,
    render: (val: any) => dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}, {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    align: 'center',
    width: 150
}, {
    title: '下载',
    key: 'download',
    dataIndex: 'download',
    align: 'center',
    width: 60,
    render: (_: any, record) => <Button
        onClick={() => onDownload(record)}
        disabled={helper.isNullOrUndefined(record.url)}
        type="link">
        下载
    </Button>
}] as ColumnsType<QuickCheckReport>;

export { getColumns };