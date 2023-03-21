import { FC, useEffect } from 'react';
import { Table } from 'antd';
import { useModel } from '@/model';
import { Protocol } from '@/schema/protocol';
import { Wap } from '@/schema/wap';
import { getTopColumns } from './column';
import { WapTopProp } from './prop';


/**
 * 专项数据（摄像头，手机信号等）Top10
 */
const WapTop: FC<WapTopProp> = ({ protocol }) => {

    useEffect(() => {
        Promise.all([
            querySpecialWapTop10Data(),
        ]);
    }, []);

    const {
        specialWapLoading,
        specialWapTop10Data,
        querySpecialWapTop10Data
    } = useModel(state => ({
        specialWapLoading: state.specialWapLoading,
        specialWapTop10Data: state.specialWapTop10Data,
        querySpecialWapTop10Data: state.querySpecialWapTop10Data
    }));

    /**
     * 按Protocol字典类型过滤数据
     */
    const filterData = () =>
        protocol === Protocol.All
            ? specialWapTop10Data
            : specialWapTop10Data.filter(item => item.protocolType === protocol);


    return <Table<Wap>
        columns={getTopColumns()}
        dataSource={filterData()}
        loading={specialWapLoading}
        pagination={false}
        bordered={false}
        rowKey="id"
    />
};

WapTop.defaultProps = {
    protocol: Protocol.All
};

export { WapTop };