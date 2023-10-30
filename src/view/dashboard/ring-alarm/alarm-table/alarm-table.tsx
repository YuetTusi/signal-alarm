import { FC } from 'react';
import { Table } from 'antd';
import { AlarmMessage } from '@/schema/phone-alarm-info';
import { AlarmTableProp } from './prop';
import { getColumns } from './column';

/**
 * 告警详情表格（该设备前5条）
 */
const AlarmTable: FC<AlarmTableProp> = ({ data }) => <Table<AlarmMessage>
    columns={getColumns(() => { })}
    dataSource={data}
    rowKey={(_, index) => `AM_${index}`}
    pagination={false}
/>;

export { AlarmTable };