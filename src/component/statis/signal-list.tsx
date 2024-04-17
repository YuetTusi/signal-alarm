
import { FC, useEffect, useRef, useState } from 'react';
import { Tag } from 'antd';
import { useModel, useShallow } from '@/model';
import { helper } from '@/utility/helper';
import { SignalDescModal } from '@/component/statis/signal-desc-modal';
import { ContinuousSignal } from '@/schema/continuous-signal';
import { DisplayPanel } from '../panel';
import { ScrollList } from './styled/box';

var scrollTimer: any = null;
var bands = helper.readBand();

/**
 * 可疑持续信号列表
 */
const SignalList: FC<{}> = () => {

    const [signalDescModalOpen, setSignalDescModalOpen] = useState<boolean>(false);
    const scrollBox = useRef<HTMLDivElement>(null);
    const currentData = useRef<ContinuousSignal>();
    const {
        signalTop,
        querySignalTop
    } = useModel(useShallow(state => ({
        signalTop: state.signalTop,
        querySignalTop: state.querySignalTop
    })));

    useEffect(() => {
        querySignalTop();
    }, []);

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

    /**
     * 执行滚动
     */
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

    /**
     * 进入滚动
     */
    const onEnterScroll = (event: MouseEvent) => {
        event.preventDefault();
        if (scrollTimer !== null) {
            clearInterval(scrollTimer);
            scrollTimer = null;
        }
    };

    /**
     * 离开滚动
     */
    const onLeaveScroll = (event: MouseEvent) => {
        event.preventDefault();
        if (scrollTimer === null) {
            scrollTimer = setInterval(() => doScroll(), 140);
        }
    };

    /**
     * 信号项Click
     */
    const onSignalItemClick = (data: ContinuousSignal) => {
        currentData.current = data;
        setSignalDescModalOpen(true);
    };

    const renderItem = () =>
        signalTop.map(item => {
            let txt = '';
            const freq = Number.parseFloat(item.freqBand);
            if (freq >= 101 && freq <= 113) {
                const has = bands.find(i => i.code === freq);
                txt = has === undefined ? '-' : has.name ?? '-';
            } else {
                txt = `频段:${item.freqBand}`
            }

            return <li
                onClick={() => onSignalItemClick(item)}
                className="signal-li"
                key={`SI_${item.id}`}>
                <Tag color="blue" style={{ textAlign: 'center' }}>
                    <span className="freq-txt">{txt}</span>
                </Tag>
                <Tag color="green">最新频率:{item.lastFreq}</Tag>
                <Tag color="cyan">持续时间:{item.duration}s</Tag>
            </li>
        });

    return <DisplayPanel>
        <div className="caption">最新可疑持续信号</div>
        <div className="content">
            <ScrollList ref={scrollBox}>
                <ul>
                    {renderItem()}
                </ul>
            </ScrollList>
        </div>
        <SignalDescModal
            open={signalDescModalOpen}
            data={currentData.current}
            onCancel={() => setSignalDescModalOpen(false)}
        />
    </DisplayPanel>;
};

export { SignalList };