import dayjs from 'dayjs';
import { FC, useEffect, useRef } from 'react';
import { Button, Empty } from 'antd';
import { useModel } from '@/model';
import { DisplayPanel } from '@/component/panel';
import { EmptyBox, ReportBox, ScrollBox } from './styled/box';
import { CheckReportProp } from './prop';

/**
 * 检测报告
 */
const CheckReport: FC<CheckReportProp> = ({ }) => {

    const {
        quickCheckReportList,
        queryQuickCheckReport
    } = useModel((state) => ({
        quickCheckReportList: state.quickCheckReportList,
        queryQuickCheckReport: state.queryQuickCheckReport
    }));

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        queryQuickCheckReport();
    }, []);

    const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        const { deltaY } = event;
        scrollRef.current!.style.scrollBehavior = 'auto';
        scrollRef.current!.scrollLeft += deltaY - 5;
    };

    useEffect(() => {
        if (scrollRef.current !== null) {
            scrollRef.current.addEventListener('wheel', onWheel);
        }
        return () => {
            scrollRef.current?.removeEventListener('wheel', onWheel);
        };
    }, [scrollRef.current]);

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
            return dayjs(endTime).diff(startTime, 'seconds').toString() + 's';
        } else {
            return '-';
        }
    };

    const renderList = () => quickCheckReportList.map((item, index) => <ReportBox key={`QCR_${index}`}>
        <div className="r-title">
            <span>{`报告编号${item.reportId ?? ''}`}</span>
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
            <Button type="primary">下载</Button>
            <Button type="primary">查看</Button>
        </div>
    </ReportBox>);

    return <DisplayPanel style={{ marginTop: '5px' }}>
        <div className="caption">
            检查报告
        </div>
        <div className="content">
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
        </div>
    </DisplayPanel>;
};

export { CheckReport };