
import { FC, useEffect, useRef } from 'react';
import { Tag } from 'antd';
import useModel from '@/model';
import { WhiteList, WhiteListType } from '@/schema/white-list';
import { DisplayPanel } from '../panel';
import { ScrollWhiteList } from './styled/box';

var scrollTimer: any = null;

const renderTypeName = (ruleType: number) => {
    switch (ruleType) {
        case WhiteListType.MAC:
            return 'MAC';
        case WhiteListType.Freq:
            return '频段';
        default:
            return '';
    }
};

const renderStatusName = (status: number) => {
    switch (status) {
        case 0:
            return <Tag color="green">生效中</Tag>;
        case 1:
            return <Tag color="orange">未生效</Tag>;
        default:
            return '';
    }
};

const WhiteListItem: FC<{ data: WhiteList }> = ({ data }) => {

    return <li>
        <div>
            <span className="wl-type">{renderTypeName(data.ruleType)}</span>
            <span>{data.ruleName}</span>
        </div>
        <div>
            <span>{renderStatusName(data.status)}</span>
        </div>
    </li>;
};

/**
 * 白名单Top10
 */
const WhiteListTop: FC<{}> = () => {

    const scrollBox = useRef<HTMLDivElement>(null);
    const {
        whiteListTop,
        queryWhiteListTop
    } = useModel(state => ({
        whiteListTop: state.whiteListTop,
        queryWhiteListTop: state.queryWhiteListTop
    }));

    useEffect(() => {
        queryWhiteListTop();
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

    const renderItem = () =>
        whiteListTop.map(item =>
            <WhiteListItem data={item} key={`WLI_${item.id}`} />);

    return <DisplayPanel>
        <div className="caption">白名单Top10</div>
        <div className="content">
            <ScrollWhiteList ref={scrollBox}>
                <ul>
                    {renderItem()}
                </ul>
            </ScrollWhiteList>
        </div>
    </DisplayPanel>;
};

export { WhiteListTop };