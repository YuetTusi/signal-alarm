import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AlarmMsg } from '@/schema/alarm-msg';
import { Protocol } from '@/schema/protocol';
import { Icon } from './icon';
import { GrayText, NoWarpLabel, RedText } from '../panel/panel';
import { ActionType } from './prop';
import ChinaMobile from '@/assets/image/chinamobile.png';
import ChinaUnicom from '@/assets/image/chinaunicom.png';
import ChinaBoardnet from '@/assets/image/chinaboardnet.png';
import ChinaTelcom from '@/assets/image/telcom.png';

type ActionHandle = (action: ActionType, record: AlarmMsg) => void;

const getColumns = (handle: ActionHandle): ColumnsType<AlarmMsg> => {
    return [{
        title: '类型',
        key: 'protocol',
        dataIndex: 'protocol',
        width: 140
    }, {
        title: '告警级别',
        key: 'warnLevel',
        dataIndex: 'warnLevel',
        width: 75
    }, {
        title: '告警原因',
        key: 'warnReason',
        dataIndex: 'warnReason',
        width: 150
    }, {
        title: '频点信息名称',
        key: 'arfcn',
        dataIndex: 'arfcn',
        width: 120
    }, {
        title: '强度值',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 60
    }, {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        width: 50,
        align: 'center',
        render: (val: number) => {
            switch (val) {
                case 0:
                    return <Tag color="orange">待处理</Tag>;
                case 1:
                    return <Tag color="green">已处理</Tag>;
                default:
                    return <Tag>未知</Tag>;
            }
        }
    }, {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId',
        width: 120
    }, {
        title: '设备地址',
        key: 'siteName',
        dataIndex: 'siteName',
        width: 160
    }, {
        title: '时间',
        key: 'captureTime',
        dataIndex: 'captureTime',
        align: 'center',
        width: 150,
    }, {
        title: '处理记录',
        key: 'remark',
        dataIndex: 'remark',
        render: (val) => <NoWarpLabel title={val}>{val}</NoWarpLabel>
    }, {
        title: '处理',
        key: 'read',
        dataIndex: 'read',
        align: 'center',
        width: 60,
        render: (val: any, record) => {
            if (record.status === 0) {
                return <a onClick={() => {
                    handle(ActionType.Process, record);
                }}>处理</a>
            } else {
                return <span style={{ color: '#707070', cursor: 'not-allowed' }}>已处理</span>
            }
        }
    }, {
        title: '详情',
        key: 'detail',
        dataIndex: 'detail',
        align: 'center',
        width: 60,
        render: (val: any, record) => <a onClick={() => {
            handle(ActionType.Detail, record);
        }}>详情</a>
    }];
};

const getTopColumns = (handle: ActionHandle): ColumnsType<AlarmMsg> => {
    return [{
        title: '',
        key: 'protocolType',
        dataIndex: 'protocolType',
        width: 30,
        align: 'center',
        render(val: Protocol) {
            switch (val) {
                case Protocol.ChinaMobile5G:
                case Protocol.ChinaMobileGSM:
                case Protocol.ChinaMobileTDDLTE:
                    return <Icon src={ChinaMobile} />;
                case Protocol.ChinaUnicom5G:
                case Protocol.ChinaUnicomFDDLTE:
                case Protocol.ChinaUnicomGSM:
                case Protocol.ChinaUnicomWCDMA:
                    return <Icon src={ChinaUnicom} />;
                case Protocol.ChinaTelecom5G:
                case Protocol.ChinaTelecomCDMA:
                case Protocol.ChinaTelecomFDDLTE:
                    return <Icon src={ChinaTelcom} />;
                case Protocol.ChinaBroadnet5G:
                    return <Icon src={ChinaBoardnet} />;
                default:
                    return null;
            }
        }
    }, {
        title: '类型',
        key: 'protocol',
        dataIndex: 'protocol',
        render(val: string, record) {
            return record.status === 0 ? <RedText>{val}</RedText> : <GrayText>{val}</GrayText>;
        }
    }, {
        title: '告警级别',
        key: 'warnLevel',
        dataIndex: 'warnLevel',
        width: 75,
        render(val: string, record) {
            return record.status === 0 ? <RedText>{val}</RedText> : <GrayText>{val}</GrayText>;
        }
    }, {
        title: '告警原因',
        key: 'warnReason',
        dataIndex: 'warnReason',
        render(val: string, record) {
            return record.status === 0 ? <RedText>{val}</RedText> : <GrayText>{val}</GrayText>;
        }
    }, {
        title: '设备地址',
        key: 'siteName',
        dataIndex: 'siteName',
        render(val: string, record) {
            return record.status === 0 ? <RedText>{val}</RedText> : <GrayText>{val}</GrayText>;
        }
    },
    {
        title: '时间',
        key: 'captureTime',
        dataIndex: 'captureTime',
        align: 'center',
        width: 150,
        render(val: string, record) {
            return record.status === 0 ? <RedText>{val}</RedText> : <GrayText>{val}</GrayText>;
        }
    }, {
        title: '处理',
        key: 'read',
        dataIndex: 'read',
        align: 'center',
        width: 60,
        render: (val: any, record) => {
            if (record.status === 0) {
                return <a onClick={() => {
                    handle(ActionType.Process, record);
                }}>处理</a>
            } else {
                return <span style={{ color: '#707070', cursor: 'not-allowed' }}>已处理</span>
            }
        }
    }, {
        title: '详情',
        key: 'detail',
        dataIndex: 'detail',
        align: 'center',
        width: 60,
        render: (val: any, record) => <a onClick={() => {
            handle(ActionType.Detail, record);
        }}>详情</a>
    }];
};


export { getColumns, getTopColumns };