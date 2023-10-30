import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AlarmMessage, PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { ComDevice, DeviceState } from '@/schema/com-device';

type ActionHandle = (action: any, record: AlarmMessage) => void;

const getColumns = (handle: ActionHandle): ColumnsType<AlarmMessage> => {
    return [{
        title: '采集时间',
        key: 'captureTime',
        dataIndex: 'captureTime'
    }, {
        title: '协议类型',
        key: 'protocol',
        dataIndex: 'protocol'
    }, {
        title: '强度',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 60
    }, {
        title: '设备场所',
        key: 'siteName',
        dataIndex: 'siteName'
    }, {
        title: '频点信息',
        key: 'arfcn',
        dataIndex: 'arfcn'
    }, {
        title: '告警原因',
        key: 'warnReason',
        dataIndex: 'warnReason'
    }];
};

export { getColumns };