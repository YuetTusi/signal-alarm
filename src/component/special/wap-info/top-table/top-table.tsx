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
        querySpecialWapTop10Data();
    }, []);

    const {
        specialWapLoading,
        specialWapTop10Data,
        querySpecialWapTop10Data
    } = useModel(state => ({
        specialWapLoading: state.specialWapLoading,
        specialWapTop10Data: state.specialWapTop10Data,
        querySpecialWapTop10Data: state.querySpecialWapTop10Data,
    }));

    const filterData = () =>
        protocol === Protocol.All
            ? specialWapTop10Data
            : specialWapTop10Data.filter(item => item.protocolType === protocol);

    specialWapTop10Data.filter((item) => item.protocolType === protocol);

    return <Table<Wap>
        columns={getColumns()}
        dataSource={filterData()}
        loading={specialWapLoading}
        pagination={false}
        bordered={true}
        rowKey="id"
    />
};

TopTable.defaultProps = {
    protocol: Protocol.All
};

export { TopTable };