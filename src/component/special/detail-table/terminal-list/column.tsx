import terminal24 from '@/assets/image/terminal24.png';
import terminal58 from '@/assets/image/terminal58.png';
import { round } from "lodash";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { NoWarpLabel } from "@/component/panel";
import { Protocol } from "@/schema/protocol";
import { Hotspot } from "@/schema/hotspot";
import { CellBox } from './styled/box';

export const getColumns = (): ColumnsType<Hotspot> => {
    return [{
        title: '类型',
        key: 'protocolType',
        dataIndex: 'protocolType',
        width: 120,
        align: 'center',
        render: (val: Protocol) => {
            switch (val) {
                case Protocol.WiFi24G:
                    return <img src={terminal24} alt="终端2.4G" width={70} />;
                case Protocol.WiFi58G:
                    return <img src={terminal58} alt="终端5.8G" width={70} />;
            }
        }
    },
    {
        title: 'MAC地址',
        key: 'mac',
        dataIndex: 'mac',
        width: 240,
        render(val: string) {
            return <CellBox><Tag color="silver">MAC</Tag><span>{val}</span></CellBox>;
        }
    },
    {
        title: 'apMac',
        key: 'apMac',
        dataIndex: 'apMac',
        width: 240,
        render(val: string) {
            return <CellBox><Tag color="silver">MAC</Tag><span>{val}</span></CellBox>;
        }
    },
    // {
    //     title: 'ssid',
    //     key: 'ssid',
    //     dataIndex: 'ssid'
    // },
    {
        title: '强度',
        key: 'rssi',
        dataIndex: 'rssi',
        render(val) {
            return <CellBox><Tag color="silver">强度</Tag><span>{val + 'dBm'}</span></CellBox>;
        }
    },
    {
        title: '连接状态',
        key: 'isConnect',
        dataIndex: 'isConnect',
        align: 'center',
        width: 100,
        render: (val: number) => val === 0
            ? <Tag color="orange" style={{ marginRight: 0 }}>未连接</Tag>
            : <Tag color="green" style={{ marginRight: 0 }}>已连接</Tag>
    }, {
        title: '厂商',
        key: 'org',
        dataIndex: 'org',
        render(val: string) {
            return <CellBox><Tag color="silver">厂商</Tag><span>{val}</span></CellBox>;
        }
    }, {
        title: '设备ID',
        key: 'deviceId',
        dataIndex: 'deviceId',
    }, {
        title: '设备场所',
        key: 'siteName',
        dataIndex: 'siteName',
        render(val: string) {
            return <NoWarpLabel title={val} width={150}>{val}</NoWarpLabel>;
        }
    }, {
        title: '距离',
        key: 'distance',
        dataIndex: 'distance',
        render(val: number) {
            return <CellBox><Tag color="silver">距离</Tag><span>{`约${round(val, 1)}米`}</span></CellBox>;
        }
    }, {
        title: '时间',
        key: 'captureTime',
        dataIndex: 'captureTime',
        align: 'center',
        render(val: number) {
            return <CellBox><Tag color="silver">时间</Tag><span>{val}</span></CellBox>;
        }
    }];
};