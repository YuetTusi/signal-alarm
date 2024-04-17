import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import { FC, useEffect, useRef, useState } from 'react';
import { App, Empty, Spin } from 'antd';
import { useModel, useShallow } from '@/model';
import { log } from '@/utility/log';
import { request } from '@/utility/http';
import { DisplayPanel } from '@/component/panel';
import { QuickCheckReport } from '@/schema/quick-check-report';
import { ReportDetailModal } from './report-detail-modal';
import { EmptyBox, ReportBox, ScrollBox } from './styled/box';
import { CheckReportProp } from './prop';

/**
 * 检测报告
 */
const CheckReport: FC<CheckReportProp> = ({ }) => {

    const {
        quickCheckReportList,
        quickCheckReportDetailModalOpen,
        setQuickCheckReportDetailModalOpen,
        queryQuickCheckReport
    } = useModel(useShallow((state) => ({
        quickCheckReportList: state.quickCheckReportList,
        quickCheckReportDetailModalOpen: state.quickCheckReportDetailModalOpen,
        setQuickCheckReportDetailModalOpen: state.setQuickCheckReportDetailModalOpen,
        queryQuickCheckReport: state.queryQuickCheckReport
    })));

    const [loading, setLoading] = useState<boolean>(false);
    const { modal } = App.useApp();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        queryQuickCheckReport();
    }, []);

    /**
     * 浏览报告Click
     */
    const onPreviewClick = debounce(async ({ url }: QuickCheckReport) => {
        setLoading(true);
        try {
            const chunk = await request.attachment(url);
            const blob = new Blob([chunk], { type: 'application/pdf' });
            window.open(URL.createObjectURL(blob));
        } catch (error) {
            log.error(`打开pdf报告失败 @component/check-report/check-report:${error.message}`);
            log.error(`ErrorStack:${error.stack}`);
            modal.warning({
                title: '失败',
                content: '加载报告失败',
                okText: '确定'
            });
        } finally {
            setLoading(false);
        }
    }, 500, { leading: true, trailing: false });

    /**
     * 生成报告时间差
     * @param startTime 开始时间
     */
    const renderFromNow = (startTime: string) =>
        dayjs().diff(startTime, 'hour') + '小时前';

    /**
     * 报告时间差
     * @param startTime 开始时间
     * @param endTime 结束时间
     */
    const renderDuring = (startTime: number | null, endTime: number | null) => {
        if (startTime && endTime) {
            const diff = dayjs(endTime).diff(startTime);
            return dayjs('00:00:00', 'HH:mm:ss').add(diff, 'ms').format('HH:mm:ss');
        } else {
            return '-';
        }
    };

    const renderList = () =>
        quickCheckReportList.map((item, index) =>
            <ReportBox
                onClick={() => onPreviewClick(item)}
                key={`QCR_${index}`}>
                <span
                    title={renderFromNow(item.createTime)}
                    className="rp">
                    {renderFromNow(item.createTime)}
                </span>
                <div className="r-title">
                    <span title={item.reportId ?? ''}>长时报告</span>
                </div>
                <div className="r-name">
                    {item.reportId}
                </div>
                <div className="df">
                    持续时间:{renderDuring(item.startTime, item.endTime)}
                </div>
            </ReportBox>);

    return <DisplayPanel style={{ marginTop: '5px' }}>
        <div className="caption">
            <span>检查报告</span>
            <a
                onClick={() => setQuickCheckReportDetailModalOpen(true)}
                style={{ color: '#fff' }}>更多</a>
        </div>
        <div className="content">
            <Spin spinning={loading} tip="读取中">
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
            onCancel={() => setQuickCheckReportDetailModalOpen(false)}
            open={quickCheckReportDetailModalOpen} />
    </DisplayPanel>;
};

export { CheckReport };