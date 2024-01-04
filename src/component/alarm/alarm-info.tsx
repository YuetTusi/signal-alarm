import { FC, useRef } from 'react';
import { useModel } from '@/model';
import { DisplayPanel } from '@/component/panel';
import { DetailModal } from './detail-modal';
import { AlarmChart } from './alarm-chart';
import { AlarmInfoBox, FixContentBox } from './styled/style';

/**
 * 预警信息
 */
const AlarmInfo: FC<{}> = () => {

    const scrollBox = useRef<HTMLDivElement>(null);
    const {
        alarmDetailModalOpen,
        setAlarmDetailModalOpen
    } = useModel(state => ({
        alarmDetailModalOpen: state.alarmDetailModalOpen,
        setAlarmDetailModalOpen: state.setAlarmDetailModalOpen
    }));

    return <AlarmInfoBox>
        <DisplayPanel>
            <div className="caption" id="alarmChartCaption">
                <span>频段告警</span>
                <a
                    onClick={() => setAlarmDetailModalOpen(true)}
                    style={{ color: '#fff' }}>更多</a>
            </div>
            <FixContentBox ref={scrollBox}>
                <AlarmChart />
                {/* <AlarmTop /> */}
            </FixContentBox>
        </DisplayPanel>
        <DetailModal
            open={alarmDetailModalOpen}
            onCancel={() => setAlarmDetailModalOpen(false)} />
    </AlarmInfoBox>;
};

export { AlarmInfo };