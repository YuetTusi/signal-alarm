import { FC, useEffect, useRef } from 'react';
import { useModel } from '@/model';
import { DisplayPanel } from '@/component/panel';
import { DetailModal } from './detail-modal';
import { AlarmTop } from './alarm-top';
import { AlarmInfoBox, FixContentBox } from './styled/style';

var scrollTimer: any = null;

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

    const doScroll = () => {
        const { current } = scrollBox;
        if (current !== null) {
            if (current.scrollTop + current.clientHeight >= current.scrollHeight) {
                current.scrollTop = 0;
            } else {
                current.scrollTop += 1;
            }
        }
    };

    const onEnterScroll = (event: MouseEvent) => {
        event.preventDefault();
        if (scrollTimer !== null) {
            clearInterval(scrollTimer);
            scrollTimer = null;
        }
    };

    const onLeaveScroll = (event: MouseEvent) => {
        event.preventDefault();
        if (scrollTimer === null) {
            scrollTimer = setInterval(() => doScroll(), 140);
        }
    };

    useEffect(() => {
        scrollTimer = setInterval(() => doScroll(), 140);
        return () => {
            if (scrollTimer) {
                clearInterval(scrollTimer);
                scrollTimer = null;
            }
        }
    }, []);

    useEffect(() => {
        const { current } = scrollBox;
        if (current) {
            current.addEventListener('mouseenter', onEnterScroll);
            current.addEventListener('mouseleave', onLeaveScroll);
        }
        return () => {
            if (current) {
                current.removeEventListener('mouseenter', onEnterScroll);
                current.removeEventListener('mouseleave', onLeaveScroll);
            }
        }
    }, []);

    return <AlarmInfoBox>
        <DisplayPanel>
            <div className="caption">
                <span>预警信息</span>
                <a
                    onClick={() => setAlarmDetailModalOpen(true)}
                    style={{ color: '#fff' }}>更多</a>
            </div>
            <FixContentBox ref={scrollBox}>
                <AlarmTop />
            </FixContentBox>
        </DisplayPanel>
        <DetailModal
            open={alarmDetailModalOpen}
            onCancel={() => setAlarmDetailModalOpen(false)} />
    </AlarmInfoBox>;
};

export { AlarmInfo };