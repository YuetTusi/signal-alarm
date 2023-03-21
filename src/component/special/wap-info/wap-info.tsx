import { FC, useState } from 'react';
import { Tabs } from 'antd';
import { DisplayPanel } from '@/component/panel';
import { getProtocolLabel, Protocol } from '@/schema/protocol';
import { WapTop } from './wap-table';
import { TerminalTop } from './terminal-table';
import { HotspotTop } from './hotspot-table';
import DetailModal from './detail-modal';
import { WapInfoBox } from './styled/style';
import { WapInfoProp } from './prop';

const toTabItem = () =>
    Object.entries(Protocol)
        .filter(([_, v]) => (typeof v === 'number'))
        .reduce<any[]>((acc, [_, v]) => {
            switch (v) {
                case Protocol.WiFi24G:
                case Protocol.WiFi58G:
                    acc.push({
                        key: v.toString(),
                        label: getProtocolLabel(v as any),
                        children: <HotspotTop protocol={v} />
                    });
                    break;
                case Protocol.Terminal:
                    acc.push({
                        key: v.toString(),
                        label: getProtocolLabel(v as any),
                        children: <TerminalTop />
                    });
                case Protocol.Others:
                    //其他跳过，最后追加以保证是页签是最后一个
                    break;
                default:
                    acc.push({
                        key: v.toString(),
                        label: getProtocolLabel(v as any),
                        children: <WapTop protocol={v as Protocol} />
                    });
                    break;
            }
            return acc;
        }, [] as any[]).concat([
            //拼上`其他`为保证是最后一个页签
            {
                key: Protocol.Others,
                label: getProtocolLabel(Protocol.Others),
                children: <WapTop protocol={Protocol.Others} />
            }
        ]);


/**
 * 专项检查数据（摄像头，手机信号，其他等）
 * @param param0 
 * @returns 
 */
const WapInfo: FC<WapInfoProp> = ({ }) => {

    const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
    const [activeKey, setActiveKey] = useState<string>(Protocol.All.toString());

    const onTabChange = (tabKey: string) => setActiveKey(tabKey);

    return <WapInfoBox>
        <DisplayPanel>
            <div className="caption">
                <span>专项检查</span>
                <a
                    onClick={() => setDetailModalOpen(true)}
                    style={{ color: '#fff' }}>详细</a>
            </div>
            <div className="content">
                <Tabs
                    onChange={onTabChange}
                    items={toTabItem()}
                    activeKey={activeKey}
                    defaultActiveKey={Protocol.All.toString()}
                    destroyInactiveTabPane={false}
                    type="card" />
            </div>
        </DisplayPanel>
        <DetailModal
            open={detailModalOpen}
            protocol={Number.parseInt(activeKey) as Protocol}
            onCancel={() => setDetailModalOpen(false)}
            onOk={() => setDetailModalOpen(false)} />
    </WapInfoBox>;
};

export { WapInfo };