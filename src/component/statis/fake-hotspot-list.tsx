
import { FC, useEffect, useRef } from 'react';
import { App, Tag } from 'antd';
import { helper } from '@/utility/helper';
import { useModel } from '@/model';
import { FakeHotspot } from '@/schema/fake-hotspot';
import { DisplayPanel } from '../panel';
import { ScrollList } from './styled/box';

var scrollTimer: any = null;

const HotspotItem: FC<{ data: FakeHotspot }> = ({ data }) => {

    const { modal } = App.useApp();

    const renderStatusText = (status: number) => {
        switch (status) {
            case 0:
                return <Tag color="green">生效中</Tag>;
            case 1:
                return <Tag color="orange">未生效</Tag>;
            default:
                return '-';
        }
    };

    const renderCount = (data: FakeHotspot) => {
        if (helper.isNullOrUndefined(data?.count) || data.count === 0) {
            return <span>（0）</span>;
        } else {
            return <a onClick={() => modal.info({
                okText: '确定',
                title: data.hotspotName,
                content: `MAC地址：${data.realMac ?? '-'}`,
                centered: true
            })}>
                （{data.count}）
            </a>;
        }
    };

    return <li>
        <div className="fixed">
            <span style={{ marginLeft: '8px' }}>{data.hotspotName}</span>
            {renderCount(data)}
        </div>
        <div>
            <span >{renderStatusText(data.status)}</span>
        </div>
    </li>;
};

/**
 * 伪热点状态列表
 */
const FakeHotspotList: FC<{}> = () => {

    const scrollBox = useRef<HTMLDivElement>(null);

    const {
        fakeHotspotList,
        queryFakeHotspotList
    } = useModel(state => ({
        fakeHotspotList: state.fakeHotspotList,
        queryFakeHotspotList: state.queryFakeHotspotList
    }));

    useEffect(() => {
        queryFakeHotspotList();
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
        fakeHotspotList.map(item =>
            <HotspotItem data={item} key={`FHI_${item.id}`} />);

    return <DisplayPanel>
        <div className="caption">伪热点防护</div>
        <div className="content">
            <ScrollList ref={scrollBox}>
                <ul>
                    {renderItem()}
                </ul>
            </ScrollList>
        </div>
    </DisplayPanel>;
};

export { FakeHotspotList };