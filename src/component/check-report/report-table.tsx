import fs from 'fs';
import path from 'path';
import debounce from 'lodash/debounce';
import dayjs, { Dayjs } from 'dayjs';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect } from 'react';
import { App, Form, Table, Divider } from 'antd';
import { useModel } from '@/model';
import { QuickCheckReport } from '@/schema/quick-check-report';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { getColumns } from './column';
import { SearchBar } from './search-bar';
import { SearchFormValue } from './prop';

const { useForm } = Form;
const { ipcRenderer } = electron;
const { writeFile } = fs.promises;

const ReportTable: FC<{}> = () => {

    const { modal } = App.useApp();
    const [formRef] = useForm<SearchFormValue>();

    useEffect(() => {
        queryCheckReportData(1, helper.PAGE_SIZE, {
            beginTime: dayjs().add(-1, 'M').format('YYYY-MM-DD HH:mm:ss'),
            endTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
    }, []);

    const {
        checkReportData,
        checkReportLoading,
        checkReportPageIndex,
        checkReportPageSize,
        checkReportTotal,
        queryCheckReportData
    } = useModel(state => ({
        checkReportData: state.checkReportData,
        checkReportLoading: state.checkReportLoading,
        checkReportPageIndex: state.checkReportPageIndex,
        checkReportPageSize: state.checkReportPageSize,
        checkReportTotal: state.checkReportTotal,
        queryCheckReportData: state.queryCheckReportData
    }));

    /**
     * 查询handle
     * @param beginTime 起始时间
     * @param endTime 结束时间
     */
    const onSearch = (beginTime: Dayjs, endTime: Dayjs) => {
        queryCheckReportData(1, helper.PAGE_SIZE, {
            beginTime: beginTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime: endTime.format('YYYY-MM-DD HH:mm:ss')
        });
    };

    const onPageChange = (pageIndex: number, pageSize: number) => {
        const { getFieldValue } = formRef;
        queryCheckReportData(pageIndex, pageSize, {
            beginTime: getFieldValue('beginTime').format('YYYY-MM-DD HH:mm:ss'),
            endTime: getFieldValue('endTime').format('YYYY-MM-DD HH:mm:ss'),
        });
    };

    /**
     * 下载报告handle
     */
    const onDownload = debounce(async (report: QuickCheckReport) => {

        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer
                .invoke('open-dialog', {
                    title: '选择存储目录',
                    properties: ['openDirectory']
                });
            if (filePaths.length > 0) {
                const fileName = path.basename(report.url, '.pdf');
                const chunk = await request.attachment(report.url);
                await writeFile(path.join(filePaths[0], fileName + '.pdf'), chunk);
                modal.success({
                    title: '下载成功',
                    content: `报告「${fileName}」已保存在${filePaths[0]}`,
                    centered: true,
                    okText: '确定'
                });
            }
        } catch (error) {
            console.warn(error);
            modal.warning({
                title: '下载失败',
                content: error.message,
                centered: true,
                okText: '确定'
            });
        }
    }, 1000, { leading: true, trailing: false });

    return <>
        <SearchBar
            formRef={formRef}
            onSearch={onSearch} />
        <Divider />
        <Table<QuickCheckReport>
            pagination={{
                onChange: onPageChange,
                current: checkReportPageIndex,
                pageSize: checkReportPageSize,
                total: checkReportTotal,
                showSizeChanger: false
            }}
            columns={getColumns(onDownload)}
            dataSource={checkReportData}
            loading={checkReportLoading}
            rowKey="taskId"
        />
    </>
};

export { ReportTable };