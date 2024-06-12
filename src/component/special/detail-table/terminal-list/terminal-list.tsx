import { FC, useEffect } from "react";
import { Table } from 'antd';
import useModel from "@/model";
import { Hotspot } from "@/schema/hotspot";
import { getColumns } from "./column";
import { TableBox } from "./styled/box";
import { DeviceListProp } from "./prop";

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

    return <TableBox>
        <Table<Hotspot>
            columns={getColumns()}
            dataSource={terminalOfHotspot}
            loading={terminalOfHotspotLoading}
            scroll={{
                y: 240
            }}
            rowKey={(record, index) => `${record.id}_${index}`}
            pagination={false}
            bordered={false}
            className="terminal-list-table" />
    </TableBox>
};

export { TerminalList };