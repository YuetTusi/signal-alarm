import { FC, useEffect } from 'react';
import { Table } from 'antd';
import { State, useModel } from '@/model';
import { getTopColumns } from './column';
import { HotspotTableProp } from './prop';
import { Hotspot } from '@/schema/hotspot';


/**
 * 专项数据（热点）Top10
 */
const HotspotTop: FC<HotspotTableProp> = ({ }) => {

    useEffect(() => {
        Promise.all([
            querySpecialHotspotTop10Data(),
        ]);
    }, []);

    const {
        specialHotspotLoading,
        specialHotspotTop10Data,
        querySpecialHotspotTop10Data
    } = useModel((state: State) => ({
        specialHotspotLoading: state.specialHotspotLoading,
        specialHotspotTop10Data: state.specialHotspotTop10Data,
        querySpecialHotspotTop10Data: state.querySpecialHotspotTop10Data
    }));

    return <Table<Hotspot>
        columns={getTopColumns()}
        dataSource={specialHotspotTop10Data}
        loading={specialHotspotLoading}
        pagination={false}
        bordered={false}
        rowKey="id"
    />
};

export { HotspotTop };