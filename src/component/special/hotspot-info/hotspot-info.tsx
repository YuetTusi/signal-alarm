import { FC, useState } from "react";
import { Tabs } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import { Protocol, getProtocolLabel } from "@/schema/protocol";
import { DisplayPanel } from "@/component/panel";
import HotspotList from './hotspot-list';
import DetailModal from "../detail-modal";
import { HotspotInfoBox } from "./styled/box";

const toTabItem = () => [
    {
        key: Protocol.WiFi24G.toString(),
        label: getProtocolLabel(Protocol.WiFi24G),
        children: <HotspotList protocol={Protocol.WiFi24G} />
    }, {
        key: Protocol.WiFi58G.toString(),
        label: getProtocolLabel(Protocol.WiFi58G),
        children: <HotspotList protocol={Protocol.WiFi58G} />
    }
] as any[];

/**
 * 专项检查数据（热点）
 * @param param0 
 * @returns 
 */
const HotspotInfo: FC<{}> = () => {

    const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
    const [activeKey, setActiveKey] = useState<string>(Protocol.WiFi24G.toString());

    const onTabChange = (tabKey: string) => setActiveKey(tabKey.toString());

    return <HotspotInfoBox>
        <DisplayPanel>
            <div className="caption">
                <span>热点信息</span>
                <a
                    onClick={() => setDetailModalOpen(true)}
                    style={{ color: '#fff' }}>详细</a>
            </div>
            <div className="content">
                <Tabs
                    onChange={onTabChange}
                    items={toTabItem()}
                    activeKey={activeKey}
                    defaultActiveKey={Protocol.WiFi24G.toString()}
                    destroyInactiveTabPane={false}
                    moreIcon={<DoubleRightOutlined />}
                    type="card" />
            </div>
        </DisplayPanel>
        <DetailModal
            open={detailModalOpen}
            protocol={Protocol.WiFi24G}
            onCancel={() => setDetailModalOpen(false)}
            onOk={() => setDetailModalOpen(false)} />
    </HotspotInfoBox>;
};

export { HotspotInfo };