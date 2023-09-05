import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect, useRef, useState } from 'react';
import { DownloadOutlined, SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { App, Button, Empty, Spin } from 'antd';
import { useModel } from '@/model';
import { log } from '@/utility/log';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { DisplayPanel } from '@/component/panel';
import { QuickCheckReport } from '@/schema/quick-check-report';
import { ReportDetailModal } from './report-detail-modal';
import { EmptyBox, ReportBox, ScrollBox } from './styled/box';
import { CheckReportProp } from './prop';

const cwd = process.cwd();
const { basename, join } = path;
const { ipcRenderer, shell } = electron;
const { mkdir, writeFile } = fs.promises;

/**
 * 检测报告
 */
const CheckReport: FC<CheckReportProp> = ({ }) => {

    const {
        quickCheckReportLoading,
        quickCheckReportList,
        queryQuickCheckReport
    } = useModel((state) => ({
        quickCheckReportLoading: state.quickCheckReportLoading,
        quickCheckReportList: state.quickCheckReportList,
        queryQuickCheckReport: state.queryQuickCheckReport
    }));

    const [loading, setLoading] = useState<boolean>(false);
    const [reportDetailModalOpen, setReportDetailModalOpen] = useState<boolean>(false);
    const { modal } = App.useApp();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        queryQuickCheckReport();
    }, []);

    /**
     * 浏览报告Click
     */
    const onPreviewClick = async (report: QuickCheckReport) => {
        setLoading(true);
        const fileName = basename(report.url, '.pdf');
        try {
            const exist = await helper.existFile(path.join(cwd, './_tmp'));
            if (!exist) {
                await mkdir(join(cwd, './_tmp'));
            }
            const chunk = await request.attachment(report.url);
            const pdf = join(cwd, '_tmp', fileName + '.pdf');
            await writeFile(pdf, chunk);
            shell.openExternal(pdf, {
                activate: true
            });
            // ipcRenderer.send('report', fileName + '.pdf');
        } catch (error) {
            log.error(`打开pdf报告失败 @component/check-report/check-report:${error.message}`);
            modal.warning({
                title: '失败',
                content: '加载报告失败',
                okText: '确定'
            });
        } finally {
            setLoading(false);
        }
    };

    /**
     * 下载Click
     */
    const onDownloadClick = debounce(async (report: QuickCheckReport) => {

        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer
                .invoke('open-dialog', {
                    title: '选择存储目录',
                    properties: ['openDirectory']
                });
            if (filePaths.length > 0) {
                // const options = url.parse(report.url);
                const fileName = basename(report.url, '.pdf');
                const chunk = await request.attachment(report.url);
                await writeFile(join(filePaths[0], fileName + '.pdf'), chunk);
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

    const renderTime = (value: number | null) => {
        if (value) {
            return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        } else {
            return '-';
        }
    };

    /**
     * 生成报告时间差(秒)
     * @param startTime 开始时间
     * @param endTime 结束时间
     */
    const renderDuring = (startTime: number | null, endTime: number | null) => {
        if (startTime && endTime) {
            const diff = dayjs(endTime).diff(startTime, 'seconds');
            return diff < 1 ? '1s' : diff.toString() + 's';
        } else {
            return '-';
        }
    };

    const renderList = () =>
        quickCheckReportList.map((item, index) =>
            <ReportBox key={`QCR_${index}`}>
                <div className="r-title">
                    <span>{`报告${item.reportId ?? ''}`}</span>
                </div>
                <div className="info">
                    <ul>
                        <li>
                            <label>开始时间</label>
                            <span>{renderTime(item.startTime)}</span>
                        </li>
                        <li>
                            <label>持续时间</label>
                            <span>{renderDuring(item.startTime, item.endTime)}</span>
                        </li>
                        <li>
                            <label>结束时间</label>
                            <span>{renderTime(item.endTime)}</span>
                        </li>
                    </ul>
                </div>
                <div className="btn">
                    <Button
                        onClick={() => onPreviewClick(item)}
                        disabled={helper.isNullOrUndefined(item?.url) || loading}
                        type="primary">
                        {loading ? <LoadingOutlined /> : <SearchOutlined />}
                        <span>查看</span>
                    </Button>
                    <Button
                        onClick={() => onDownloadClick(item)}
                        disabled={helper.isNullOrUndefined(item?.url)}
                        type="primary">
                        <DownloadOutlined />
                        <span>下载</span>
                    </Button>
                </div>
            </ReportBox>);

    return <DisplayPanel style={{ marginTop: '5px' }}>
        <div className="caption">
            <span>检查报告</span>
            <a
                onClick={() => setReportDetailModalOpen(true)}
                style={{ color: '#fff' }}>更多</a>
        </div>
        <div className="content">
            <Spin spinning={quickCheckReportLoading} tip="加载中">
                {
                    quickCheckReportList.length === 0
                        ?
                        <EmptyBox>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </EmptyBox>
                        :
                        <ScrollBox ref={scrollRef}>
                            {renderList()}
                        </ScrollBox>
                }
            </Spin>
        </div>
        <ReportDetailModal
            onCancel={() => setReportDetailModalOpen(false)}
            open={reportDetailModalOpen} />
    </DisplayPanel>;
};

export { CheckReport };