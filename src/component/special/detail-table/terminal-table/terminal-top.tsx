import { FC, useEffect } from 'react';
import { Table } from 'antd';
import { useModel } from '@/model';
import { Wap } from '@/schema/wap';
import { getTopColumns } from './column';


/**
 * 专项数据（终端）Top10
 */
const TerminalTop: FC<{}> = () => {

    useEffect(() => {
        Promise.all([
            querySpecialTerminalTop10Data(),
        ]);
    }, []);

    const {
        specialTerminalLoading,
        specialTerminalTop10Data,
        querySpecialTerminalTop10Data
    } = useModel(state => ({
        specialTerminalTop10Data: state.specialTerminalTop10Data,
        specialTerminalLoading: state.specialTerminalLoading,
        querySpecialTerminalTop10Data: state.querySpecialTerminalTop10Data
    }));


    return <Table<Wap>
        columns={getTopColumns()}
        dataSource={specialTerminalTop10Data}
        loading={specialTerminalLoading}
        pagination={false}
        bordered={false}
        rowKey="id"
    />
};

export { TerminalTop };