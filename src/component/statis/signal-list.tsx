
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
        signalData,
        querySignalData
    } = useModel(useShallow(state => ({
        signalData: state.signalData,
        querySignalData: state.querySignalData
    })));

    useEffect(() => {
        querySignalData(1, helper.PAGE_SIZE, {});
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

    useEffect(() => { console.log(signalData) }, [signalData]);

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
        signalData.map(item => {
            const band = bands.find(i => i.code === Number.parseInt(item.freqBand));
            let txt = '';
            if (band === undefined) {
                txt = '其他';
            } else {
                if (band.name === '移动/广电(4G-B41/5G-N41)') {
                    txt = 'B41/N41';
                }
                else if (band.name.includes('-')) {
                    const from = band.name.lastIndexOf('-');
                    const to = band.name.lastIndexOf(')');
                    txt = band.name.substring(from + 1, to);
                } else {
                    txt = band.name;
                }
            }
            return <li
                onClick={() => onSignalItemClick(item)}
                className="signal-li"
                key={`SI_${item.id}`}>
                <Tag color="blue" style={{ textAlign: 'center' }}>{txt}</Tag>
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