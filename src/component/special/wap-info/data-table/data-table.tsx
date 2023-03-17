import { FC, useEffect } from 'react';
import { Table } from 'antd';
import { useModel } from '@/model';
import { Wap } from '@/schema/wap';
import { helper } from '@/utility/helper';
import { getColumns } from './column';
import { DataTableProp } from './prop';


/**
 * 专项检测分页数据
 */
const DataTable: FC<DataTableProp> = ({ }) => {

    useEffect(() => {
        querySpecialWapData(1, helper.PAGE_SIZE);
    }, []);

    const {
        specialWapLoading,
        specialWapPageIndex,
        specialWapPageSize,
        specialWapTotal,
        specialWapData,
        querySpecialWapData
    } = useModel(state => ({
        specialWapPageIndex: state.specialWapPageIndex,
        specialWapPageSize: state.specialWapPageSize,
        specialWapTotal: state.specialWapTotal,
        specialWapData: state.specialWapData,
        specialWapLoading: state.specialWapLoading,
        querySpecialWapData: state.querySpecialWapData
    }));

    const onPageChange = async (pageIndex: number, pageSize: number) => {
        try {
            await querySpecialWapData(pageIndex, pageSize);
        } catch (error) {
            console.log(error);
        }
    };

    return <Table<Wap>
        columns={getColumns()}
        dataSource={specialWapData}
        loading={specialWapLoading}
        pagination={{
            onChange: onPageChange,
            total: specialWapTotal,
            current: specialWapPageIndex,
            pageSize: specialWapPageSize
        }}
        rowKey="id"
    />
};

DataTable.defaultProps = {
};

export { DataTable };