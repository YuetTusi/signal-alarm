import ChinaMobileGSM from '@/assets/image/chinamobilegsm.png';
import ChinaUnicomGSM from '@/assets/image/chinaunicomgsm.png';
import ChinaTelecomCDMA from '@/assets/image/chinatelecomcdma.png';
import ChinaUnicomWCDMA from '@/assets/image/ChinaUnicomwcdma.png';
import ChinaMobileTDDLTE from '@/assets/image/chinamobiletddlte.png';
import ChinaUnicomFDDLTE from '@/assets/image/chinaunicomfddlte.png';
import ChinaTelecomFDDLTE from '@/assets/image/ChinaTelecomfddlte.png';
import ChinaMobile5G from '@/assets/image/chinamobile5g.png';
import ChinaUnicom5G from '@/assets/image/chinaunicom5G.png';
import ChinaBroadnet5G from '@/assets/image/chinabroadnet5g.png';
import ChinaTelecom5G from '@/assets/image/chinatelecom5g.png';
import Detectaphone from '@/assets/image/detectaphone.png';
import Bluetooth from '@/assets/image/bluetooth.png';
import Wifi24 from '@/assets/image/wifi24.png';
import Wifi58 from '@/assets/image/wifi58.png';
import GpsLocator from '@/assets/image/gpslocator.png';
import Camera from '@/assets/image/camera.png';
import Others from '@/assets/image/others.png';
import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { helper } from '@/utility/helper';
import { AlarmMsg } from '@/schema/alarm-msg';
import { Protocol } from '@/schema/protocol';
import { Icon } from './icon';
import { GrayText, NoWarpLabel, RedText } from '../panel';
import { ActionType } from './prop';

const brands = helper.readBand();

type ActionHandle = (action: ActionType, record: AlarmMsg) => void;

const getColumns = (handle: ActionHandle): ColumnsType<AlarmMsg> => [
    {
        title: '类型',
        key: 'protocol',
        dataIndex: 'protocol',
        width: 200
    }, {
        title: '频段信息',
        key: 'warnReason',
        dataIndex: 'warnReason',
        width: 260,
        render: (val: string) => {
            const current = brands.find(i => i.code.toString() == val);
            return <NoWarpLabel width={260} title={current?.name}>{current?.name ?? '-'}</NoWarpLabel>;
        }
    }, {
        title: '频点信息名称',
        key: 'arfcn',
        dataIndex: 'arfcn',
        width: 140
    }, {
        title: '强度',
        key: 'rssi',
        dataIndex: 'rssi',
        width: 80
    }, {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        width: 80,
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
        width: 160,
        render: (val) => <NoWarpLabel width={160} title={val}>{val}</NoWarpLabel>
    }, {
        title: '设备场所',
        key: 'siteName',
        dataIndex: 'siteName',
        width: 160,
        render: (val) => <NoWarpLabel width={160} title={val}>{val}</NoWarpLabel>
    }, {
        title: '时间',
        key: 'captureTime',
        dataIndex: 'captureTime',
        align: 'center',
        width: 200,
    }, {
        title: '处理记录',
        key: 'remark',
        dataIndex: 'remark',
        render: (val) => <NoWarpLabel width={130} title={val}>{val}</NoWarpLabel>
    }, {
        title: '处理',
        key: 'read',
        dataIndex: 'read',
        align: 'center',
        width: 60,
        render: (_: any, record) => {
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
        render: (_: any, record) => <a onClick={() => {
            handle(ActionType.Detail, record);
        }}>详情</a>
    }
];

const getTopColumns = (handle: ActionHandle): ColumnsType<AlarmMsg> => [{
    title: '',
    key: 'protocolType',
    dataIndex: 'protocolType',
    width: 80,
    align: 'center',
    render(val: Protocol) {
        switch (val) {
            case Protocol.ChinaMobile5G:
                return <Icon src={ChinaMobile5G} />;
            case Protocol.ChinaMobileGSM:
                return <Icon src={ChinaMobileGSM} />;
            case Protocol.ChinaMobileTDDLTE:
                return <Icon src={ChinaMobileTDDLTE} />;
            case Protocol.ChinaUnicom5G:
                return <Icon src={ChinaUnicom5G} />;
            case Protocol.ChinaUnicomFDDLTE:
                return <Icon src={ChinaUnicomFDDLTE} />;
            case Protocol.ChinaUnicomGSM:
                return <Icon src={ChinaUnicomGSM} />;
            case Protocol.ChinaUnicomWCDMA:
                return <Icon src={ChinaUnicomWCDMA} />;
            case Protocol.ChinaTelecom5G:
                return <Icon src={ChinaTelecom5G} />;
            case Protocol.ChinaTelecomCDMA:
                return <Icon src={ChinaTelecomCDMA} />;
            case Protocol.ChinaTelecomFDDLTE:
                return <Icon src={ChinaTelecomFDDLTE} />;
            case Protocol.ChinaBroadnet5G:
                return <Icon src={ChinaBroadnet5G} />;
            case Protocol.Detectaphone:
                return <Icon src={Detectaphone} />;
            case Protocol.Bluetooth50:
                return <Icon src={Bluetooth} />;
            case Protocol.WiFi24G:
                return <Icon src={Wifi24} />;
            case Protocol.WiFi58G:
                return <Icon src={Wifi58} />;
            case Protocol.GPSLocator:
                return <Icon src={GpsLocator} />;
            case Protocol.Camera:
                return <Icon src={Camera} />;
            case Protocol.Others:
                return <Icon src={Others} />;
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
},
// {
//     title: '告警级别',
//     key: 'warnLevel',
//     dataIndex: 'warnLevel',
//     width: 75,
//     render(val: string, record) {
//         return record.status === 0 ? <RedText>{val}</RedText> : <GrayText>{val}</GrayText>;
//     }
// }, 
{
    title: '频点值',
    key: 'arfcn',
    dataIndex: 'arfcn',
    width: 120,
    render(val: string, record) {
        return record.status === 0 ? <RedText>{val}</RedText> : <GrayText>{val}</GrayText>;
    }
},
{
    title: '告警原因',
    key: 'warnReason',
    dataIndex: 'warnReason',
    render(val: string, record) {
        return record.status === 0 ? <RedText>{val}</RedText> : <GrayText>{val}</GrayText>;
    }
}, {
    title: '设备场所',
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
    width: 170,
    render(val: string, record) {
        return record.status === 0 ? <RedText>{val}</RedText> : <GrayText>{val}</GrayText>;
    }
}, {
    title: '处理',
    key: 'read',
    dataIndex: 'read',
    align: 'center',
    width: 50,
    render: (_: any, record) => {
        if (record.status === 0) {
            return <a
                onClick={() => {
                    handle(ActionType.Process, record);
                }}
                style={{ color: '#fff' }}>处理</a>
        } else {
            return <span style={{ color: '#707070', cursor: 'not-allowed' }}>已处理</span>
        }
    }
}, {
    title: '详情',
    key: 'detail',
    dataIndex: 'detail',
    align: 'center',
    width: 50,
    render: (_: any, record) => <a onClick={() => {
        handle(ActionType.Detail, record);
    }}
        style={{ color: '#fff' }}>详情</a>
}];

export { getColumns, getTopColumns };