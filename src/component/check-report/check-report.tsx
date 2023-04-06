import dayjs from 'dayjs';
import { FC, useEffect } from 'react';
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

    useEffect(() => {
        queryQuickCheckReport();
    }, []);

    const renderTime = (value: number | null) => {
        if (value) {
            return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        } else {
            return '-';
        }
    };

    const renderDuring = (startTime: number | null, endTime: number | null) => {
        if (startTime && endTime) {
            return dayjs(startTime).diff(endTime, 'seconds').toString();
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
                    <ScrollBox>
                        {renderList()}
                    </ScrollBox>
            }
        </div>
    </DisplayPanel>;
};

export { CheckReport };