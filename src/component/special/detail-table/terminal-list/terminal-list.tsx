import { FC, useEffect } from "react";
import { Table } from 'antd';
import { DeviceListProp } from "./prop";
import useModel from "@/model";
import { getColumns } from "./column";
import { Hotspot } from "@/schema/hotspot";
import { useUnmount } from "@/hook";

/**
 * 终端列表（热点下）
 */
const TerminalList: FC<DeviceListProp> = ({ show, mac, startTime, endTime }) => {

    const {
        terminalOfHotspot,
        terminalOfHotspotLoading,
        queryTerminalOfHotspot
    } = useModel((state) => ({
        terminalOfHotspot: state.terminalOfHotspot,
        terminalOfHotspotLoading: state.terminalOfHotspotLoading,
        queryTerminalOfHotspot: state.queryTerminalOfHotspot
    }));

    useEffect(() => {
        if (show) {
            queryTerminalOfHotspot(1, 10000000, { mac, startTime, endTime });
        }
    }, [show, mac, startTime, endTime]);

    return <div>
        <Table<Hotspot>
            columns={getColumns()}
            dataSource={terminalOfHotspot}
            loading={terminalOfHotspotLoading}
            scroll={{
                y: 240
            }}
            rowKey={(record, index) => `${record.id}_${index}`}
            pagination={false}
            bordered={false} />
    </div>
};

export { TerminalList };