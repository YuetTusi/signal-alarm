import { FC, useState } from 'react';
import { Tabs } from 'antd';
import TopTable from './top-table';
import { getProtocolLabel, Protocol } from '@/schema/protocol';
import { DisplayPanel } from '@/component/panel';
import DetailModal from './detail-modal';
import { WapInfoBox } from './styled/style';
import { WapInfoProp } from './prop';

const toTabItem = () =>
    Object.entries(Protocol).reduce((acc, [_, v]) => {
        if (typeof v === 'number' && v !== Protocol.Others) {
            acc.push({
                key: v.toString(),
                label: getProtocolLabel(v),
                children: <TopTable protocol={v as Protocol} />
            });
        }
        return acc;
    }, [] as any[]).concat([
        //拼上`其他`为保证是最后一个页签
        {
            key: Protocol.Others.toString(),
            label: getProtocolLabel(Protocol.Others),
            children: <TopTable protocol={Protocol.Others} />
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
                    activeKey={activeKey}
                    items={toTabItem()}
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