import { FC, useEffect } from 'react';
import { Table } from 'antd';
import { useModel } from '@/model';
import { Protocol } from '@/schema/protocol';
import { Wap } from '@/schema/wap';
import { getColumns } from './column';
import { TopTableProp } from './prop';


/**
 * 专项检测Top10
 */
const TopTable: FC<TopTableProp> = ({ protocol }) => {

    useEffect(() => {
        Promise.all([
            querySpecialWapTop10Data(),
            querySpecialHotspotTop10Data(),
            querySpecialTerminalTop10Data()
        ]);
    }, []);

    const {
        specialWapLoading,
        specialWapTop10Data,
        specialHotspotLoading,
        specialHotspotTop10Data,
        specialTerminalLoading,
        specialTerminalTop10Data,
        querySpecialWapTop10Data,
        querySpecialHotspotTop10Data,
        querySpecialTerminalTop10Data
    } = useModel(state => ({
        specialWapLoading: state.specialWapLoading,
        specialHotspotLoading: state.specialHotspotLoading,
        specialWapTop10Data: state.specialWapTop10Data,
        specialHotspotTop10Data: state.specialHotspotTop10Data,
        specialTerminalLoading: state.specialTerminalLoading,
        specialTerminalTop10Data: state.specialTerminalTop10Data,
        querySpecialWapTop10Data: state.querySpecialWapTop10Data,
        querySpecialHotspotTop10Data: state.querySpecialHotspotTop10Data,
        querySpecialTerminalTop10Data: state.querySpecialTerminalTop10Data
    }));

    /**
     * 全部数据将`热点`，`终端`与wap数据合并一起显示
     */
    const getAllData = () => specialWapTop10Data;

    /**
     * 按Protocol字典类型过滤数据
     */
    const filterData = () => {
        if (protocol === Protocol.Hotspot) {
            return specialHotspotTop10Data;
        } else if (protocol === Protocol.Terminal) {
            return specialTerminalTop10Data;
        } else {
            return protocol === Protocol.All
                ? getAllData()
                : specialWapTop10Data.filter(item => item.protocolType === protocol);
        }
    };

    return <Table<Wap>
        columns={getColumns()}
        dataSource={filterData()}
        loading={specialWapLoading || specialHotspotLoading || specialTerminalLoading}
        pagination={false}
        bordered={false}
        rowKey="id"
    />
};

TopTable.defaultProps = {
    protocol: Protocol.All
};

export { TopTable };