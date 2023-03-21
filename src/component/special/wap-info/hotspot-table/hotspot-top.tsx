import { FC, useEffect } from 'react';
import { Table } from 'antd';
import { useModel } from '@/model';
import { Wap } from '@/schema/wap';
import { getTopColumns } from './column';
import { HotspotTopProp } from './prop';


/**
 * 专项数据（热点）Top10
 */
const HotspotTop: FC<HotspotTopProp> = ({ protocol }) => {

    useEffect(() => {
        Promise.all([
            querySpecialHotspotTop10Data(),
        ]);
    }, []);

    const {
        specialHotspotLoading,
        specialHotspotTop10Data,
        querySpecialHotspotTop10Data
    } = useModel(state => ({
        specialHotspotLoading: state.specialHotspotLoading,
        specialHotspotTop10Data: state.specialHotspotTop10Data,
        querySpecialHotspotTop10Data: state.querySpecialHotspotTop10Data
    }));

    const filterData = () =>
        specialHotspotTop10Data.filter(item => item.protocolType === protocol);

    return <Table<Wap>
        columns={getTopColumns()}
        dataSource={filterData()}
        loading={specialHotspotLoading}
        pagination={false}
        bordered={false}
        rowKey="id"
    />
};

export { HotspotTop };