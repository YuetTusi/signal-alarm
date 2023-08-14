import fs from 'fs';
import path from 'path';
import dayjs, { Dayjs } from 'dayjs';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect } from 'react';
import { App, message, Form, Table } from 'antd';
import { useModel } from '@/model';
import { Wap } from '@/schema/wap';
import { helper } from '@/utility/helper';
import { SearchBar } from './search-bar';
import { getColumns } from './column';
import { SearchFormValue, WapTableProp } from './prop';
import { Protocol } from '@/schema/protocol';

const { ipcRenderer } = electron;
const { writeFile } = fs.promises;
const { join } = path;
const { useForm } = Form;

/**
 * 专项检测分页数据
 */
const WapTable: FC<WapTableProp> = ({ parentOpen }) => {

    const { modal } = App.useApp();
    const [formRef] = useForm<SearchFormValue>();

    useEffect(() => {
        if (parentOpen) {
            querySpecialWapData(1, helper.PAGE_SIZE, {
                beginTime: dayjs().add(-1, 'M').format('YYYY-MM-DD 00:00:00'),
                endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
                protocolTypes: helper.protocolToString([
                    Protocol.ChinaMobileGSM,
                    Protocol.ChinaUnicomGSM,
                    Protocol.ChinaTelecomCDMA,
                    Protocol.ChinaUnicomWCDMA,
                    Protocol.ChinaMobileTDDLTE,
                    Protocol.ChinaUnicomFDDLTE,
                    Protocol.ChinaTelecomFDDLTE,
                    Protocol.ChinaMobile5G,
                    Protocol.ChinaUnicom5G,
                    Protocol.ChinaBroadnet5G,
                    Protocol.Camera,
                    Protocol.Bluetooth50,
                    Protocol.Detectaphone,
                    Protocol.GPSLocator,
                    Protocol.Others
                ])
            });
        }
    }, [parentOpen]);

    const {
        specialWapLoading,
        specialWapPageIndex,
        specialWapPageSize,
        specialWapTotal,
        specialWapData,
        querySpecialWapData,
        exportSpecialWapData,
        setReading
    } = useModel(state => ({
        specialWapPageIndex: state.specialWapPageIndex,
        specialWapPageSize: state.specialWapPageSize,
        specialWapTotal: state.specialWapTotal,
        specialWapData: state.specialWapData,
        specialWapLoading: state.specialWapLoading,
        querySpecialWapData: state.querySpecialWapData,
        exportSpecialWapData: state.exportSpecialWapData,
        setReading: state.setReading,
    }));

    /**
     * 翻页Change
     */
    const onPageChange = async (pageIndex: number, pageSize: number) => {
        const condition = formRef.getFieldsValue();
        try {
            await querySpecialWapData(pageIndex, pageSize, {
                beginTime: condition.beginTime.format('YYYY-MM-DD 00:00:00'),
                endTime: condition.endTime.format('YYYY-MM-DD 23:59:59'),
                protocolTypes: condition.type
            });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * 查询
     * @param beginTime 起始时间
     * @param endTime 结束时间
     * @param type 类型
     */
    const onSearch = async (beginTime: Dayjs, endTime: Dayjs, type: string) => {
        console.clear();
        console.log(type);
        try {
            await querySpecialWapData(1, helper.PAGE_SIZE, {
                beginTime: beginTime.format('YYYY-MM-DD 00:00:00'),
                endTime: endTime.format('YYYY-MM-DD 23:59:59'),
                protocolTypes: type
            });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 导出
     * @param beginTime 起始时间
     * @param endTime 结束时间
     */
    const onExport = async () => {
        message.destroy();
        const fileName = '专项数据_' + dayjs().format('YYYYMMDDHHmmss') + '.xlsx';
        const condition = formRef.getFieldsValue();
        setReading(true);
        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke('open-dialog', {
                title: '选择存储目录',
                properties: ['openDirectory']
            });
            if (filePaths.length > 0) {
                const data = await exportSpecialWapData(specialWapPageIndex, specialWapPageSize, {
                    beginTime: condition.beginTime.format('YYYY-MM-DD 00:00:00'),
                    endTime: condition.endTime.format('YYYY-MM-DD 23:59:59'),
                    protocolTypes: condition.type
                });
                await writeFile(join(filePaths[0], fileName), data);
                modal.success({
                    title: '导出成功',
                    content: `数据文件「${fileName}」已保存在${filePaths[0]}`,
                    centered: true,
                    okText: '确定'
                });
            }
        } catch (error) {
            console.warn(error);
            message.warning(`导出失败（${error.message}）`);
        } finally {
            setReading(false);
        }
    };

    return <>
        <SearchBar
            formRef={formRef}
            parentOpen={parentOpen}
            onExport={onExport}
            onSearch={onSearch} />
        <Table<Wap>
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
    </>
};

WapTable.defaultProps = {
    parentOpen: false
};

export { WapTable };