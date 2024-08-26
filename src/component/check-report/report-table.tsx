import fs from 'fs';
import path from 'path';
import debounce from 'lodash/debounce';
import dayjs, { Dayjs } from 'dayjs';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect } from 'react';
import { App, Form, Table, Divider, message } from 'antd';
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
            beginTime: dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00'),
            endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
        });
    }, []);

    const {
        checkReportData,
        checkReportLoading,
        checkReportPageIndex,
        checkReportPageSize,
        checkReportTotal,
        queryQuickCheckReport,
        queryCheckReportData,
        checkReportGenerate
    } = useModel(state => ({
        checkReportData: state.checkReportData,
        checkReportLoading: state.checkReportLoading,
        checkReportPageIndex: state.checkReportPageIndex,
        checkReportPageSize: state.checkReportPageSize,
        checkReportTotal: state.checkReportTotal,
        queryQuickCheckReport: state.queryQuickCheckReport,
        queryCheckReportData: state.queryCheckReportData,
        checkReportGenerate: state.checkReportGenerate
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

    /**
     * 生成handle
     * @param beginTime 起始时间
     * @param endTime 结束时间
     */
    const onGenerate = async (beginTime: Dayjs, endTime: Dayjs) => {
        message.destroy();
        let hour = endTime.diff(beginTime, 'hour');
        if (hour > 24 || hour < 0) {
            message.info('生成时间在24小时之内');
            return;
        }
        try {
            const res = await checkReportGenerate(beginTime.valueOf(), endTime.valueOf());
            if (res !== null && res.code === 200) {
                queryQuickCheckReport();
                formRef.setFieldsValue({
                    beginTime: dayjs(dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00')),
                    endTime: dayjs(dayjs().format('YYYY-MM-DD 23:59:59'))
                });
                queryCheckReportData(1, helper.PAGE_SIZE, {
                    beginTime: dayjs().add(-1, 'w').format('YYYY-MM-DD 00:00:00'),
                    endTime: dayjs().format('YYYY-MM-DD 23:59:59'),
                });
                message.success('生成成功');
            } else {
                message.warning('生成失败');
            }
        } catch (error) {
            message.warning(`生成失败 ${error.message ?? ''}`);
        }
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
    const onDownload = debounce(async ({ url }: QuickCheckReport) => {

        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer
                .invoke('open-dialog', {
                    title: '选择存储目录',
                    properties: ['openDirectory']
                });
            if (filePaths.length > 0) {
                const [saveAt] = filePaths;
                const fileName = path.basename(url, '.pdf');
                console.log(fileName);
                const chunk = await request.attachment(url);
                await writeFile(path.join(saveAt, fileName + '.docx'), chunk);
                modal.success({
                    title: '下载成功',
                    content: <p>{`报告「${fileName}.docx」 已保存在 ${saveAt}`}</p>,
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
            loading={checkReportLoading}
            onSearch={onSearch}
            onGenerate={onGenerate} />
        <Divider />
        <Table<QuickCheckReport>
            pagination={{
                onChange: onPageChange,
                current: checkReportPageIndex,
                pageSize: checkReportPageSize,
                total: checkReportTotal,
                showSizeChanger: false,
                showTotal: (total) => `共${total}条`
            }}
            columns={getColumns(onDownload)}
            dataSource={checkReportData}
            loading={checkReportLoading}
            scroll={{ x: 'max-content' }}
            rowKey="taskId"
            size="middle"
        />
    </>
};

export { ReportTable };