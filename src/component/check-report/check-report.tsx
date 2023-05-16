import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import electron, { OpenDialogReturnValue } from 'electron';
import { FC, useEffect, useRef } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { App, Button, Empty, Spin } from 'antd';
import { useModel } from '@/model';
import { request } from '@/utility/http';
import { DisplayPanel } from '@/component/panel';
import { QuickCheckReport } from '@/schema/quick-check-report';
import { EmptyBox, ReportBox, ScrollBox } from './styled/box';
import { CheckReportProp } from './prop';

const { ipcRenderer } = electron;
const { writeFile } = fs.promises;

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

    const { modal } = App.useApp();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        queryQuickCheckReport();
    }, []);

    /**
     * 下载Click
     */
    const onDownloadClick = debounce(async ({ url }: QuickCheckReport) => {

        try {
            const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke('open-dialog', {
                title: '选择存储目录',
                properties: ['openDirectory']
            });
            if (filePaths.length > 0) {
                const fileName = path.basename(url, '.pdf');
                const chunk = await request.attachment(url);
                await writeFile(path.join(filePaths[0], fileName + '.pdf'), chunk);
                modal.success({
                    title: '导出成功',
                    content: `数据文件「${fileName}」已保存在${filePaths[0]}`,
                    centered: true,
                    okText: '确定'
                });
            }
        } catch (error) {
            console.warn(error);
            modal.warning({
                title: '导出失败',
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
                        onClick={() => onDownloadClick(item)}
                        type="primary"
                        style={{ width: '120px' }}>
                        <DownloadOutlined />
                        <span>下载报告</span>
                    </Button>
                    {/* <Button onClick={() => onPreviewClick(item)} type="primary">查看</Button> */}
                </div>
            </ReportBox>);

    return <DisplayPanel style={{ marginTop: '5px' }}>
        <div className="caption">
            检查报告
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
    </DisplayPanel>;
};

export { CheckReport };