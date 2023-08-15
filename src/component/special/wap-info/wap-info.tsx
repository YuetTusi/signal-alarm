import { FC, useEffect, useState } from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Empty, Tabs, message } from 'antd';
import { useModel } from '@/model';
import { DisplayPanel } from '@/component/panel';
import { ScrollPanel } from '@/component/panel/panel';
import { Protocol } from '@/schema/protocol';
import { SpecialBase } from '@/schema/special-base';
import { TopList, TerminalList, HotspotList, TotalList, WiretapList } from '../top-list';
import DetailModal from '../detail-modal';
import { EmptyBox, WapInfoBox } from './styled/style';
import { WapInfoProp, SpiTab } from './prop';

var timer: any = null;

/**
 * 数据转TabItem
 * @param data 专项检查数据
 * @param type 标签页枚举
 * @param loading 加载中
 */
const toTabItem = (data: SpecialBase[], type: SpiTab, loading: boolean) => [{
    key: SpiTab.All,
    label: '全部',
    children: <ScrollPanel>
        <TotalList data={data} type={type} loading={loading} />
    </ScrollPanel>
}, {
    key: SpiTab.Signal,
    label: '制式信号',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <TopList data={data} type={type} loading={loading} />
        }
    </ScrollPanel>
}, {
    key: SpiTab.Hotspot,
    label: '热点',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <HotspotList data={data} type={type} loading={loading} />
        }
    </ScrollPanel>
}, {
    key: SpiTab.Camera,
    label: '摄像头',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <TopList data={data} type={type} loading={loading} />
        }
    </ScrollPanel>
}, {
    key: SpiTab.Wiretap,
    label: '窃听器',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <WiretapList data={data} type={type} loading={loading} />
        }
    </ScrollPanel>
}, {
    key: SpiTab.Terminal,
    label: '终端',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <TerminalList data={data} type={type} loading={loading} />
        }
    </ScrollPanel>
}, {
    key: SpiTab.Others,
    label: '其他',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <TopList data={data} type={type} loading={loading} />
        }
    </ScrollPanel>
}];


/**
 * 专项检查数据（摄像头，手机信号，其他等）
 */
const WapInfo: FC<WapInfoProp> = ({ }) => {

    const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
    const [activeKey, setActiveKey] = useState<string>(SpiTab.All);

    const {
        specialTopLoading,
        specialWapTopData,
        specialHotsportTopData,
        specialTerminalTopData,
        specialWiretapTopData,
        getAllTopData,
        querySpecialWapTopData,
        querySpecialHotspotTopData,
        querySpecialTerminalTopData,
        querySpecialWiretapTopData
    } = useModel(state => ({
        specialTopLoading: state.specialTopLoading,
        specialWapTopData: state.specialWapTopData,
        specialHotsportTopData: state.specialHotsportTopData,
        specialTerminalTopData: state.specialTerminalTopData,
        specialWiretapTopData: state.specialWiretapTopData,
        getAllTopData: state.getAllTopData,
        querySpecialWapTopData: state.querySpecialWapTopData,
        querySpecialHotspotTopData: state.querySpecialHotspotTopData,
        querySpecialTerminalTopData: state.querySpecialTerminalTopData,
        querySpecialWiretapTopData: state.querySpecialWiretapTopData
    }));

    /**
     * 并发查询3个接口数据（全部）
     */
    const queryAllTop = () => Promise.allSettled([
        querySpecialWapTopData([
            Protocol.ChinaMobileGSM,
            Protocol.ChinaUnicomGSM,
            Protocol.ChinaTelecomCDMA,
            Protocol.ChinaUnicomWCDMA,
            Protocol.ChinaMobileTDDLTE,
            Protocol.ChinaUnicomFDDLTE,
            Protocol.ChinaTelecomFDDLTE,
            Protocol.ChinaMobile5G,
            Protocol.ChinaUnicom5G,
            Protocol.ChinaBroadnet5G,
            Protocol.Camera,
            Protocol.Bluetooth50,
            Protocol.Detectaphone,
            Protocol.GPSLocator,
            Protocol.Others
        ]),
        querySpecialHotspotTopData([
            Protocol.WiFi24G,
            Protocol.WiFi58G
        ]),
        querySpecialTerminalTopData([
            Protocol.WiFi24G,
            Protocol.WiFi58G,
            Protocol.Bluetooth50
        ]),
        querySpecialWiretapTopData([
            Protocol.Detectaphone
        ])
    ]);

    const queryData = async (activeKey: string) => {
        message.destroy();
        try {
            switch (activeKey) {
                case SpiTab.All:
                    await queryAllTop();
                    break;
                case SpiTab.Signal:
                    await querySpecialWapTopData([
                        Protocol.ChinaMobileGSM,
                        Protocol.ChinaUnicomGSM,
                        Protocol.ChinaTelecomCDMA,
                        Protocol.ChinaUnicomWCDMA,
                        Protocol.ChinaMobileTDDLTE,
                        Protocol.ChinaUnicomFDDLTE,
                        Protocol.ChinaTelecomFDDLTE,
                        Protocol.ChinaMobile5G,
                        Protocol.ChinaUnicom5G,
                        Protocol.ChinaBroadnet5G,
                        Protocol.ChinaTelecom5G,
                        Protocol.GPSLocator
                    ]);
                    break;
                case SpiTab.Hotspot:
                    await querySpecialHotspotTopData([
                        Protocol.WiFi24G,
                        Protocol.WiFi58G
                    ]);
                    break;
                case SpiTab.Camera:
                    await querySpecialWapTopData([
                        Protocol.Camera
                    ]);
                    break;
                case SpiTab.Terminal:
                    await querySpecialTerminalTopData([
                        Protocol.WiFi24G,
                        Protocol.WiFi58G,
                        Protocol.Bluetooth50
                    ]);
                    break;
                case SpiTab.Wiretap:
                    await querySpecialWiretapTopData([
                        Protocol.Detectaphone
                    ]);
                    break;
                case SpiTab.Others:
                    await querySpecialWapTopData([
                        Protocol.Bluetooth50,
                        Protocol.Detectaphone,
                        Protocol.GPSLocator,
                        Protocol.Others
                    ]);
                    break;
            }
        } catch (error) {
            message.warning(`查询失败,${error.message}`);
        }
    };

    useEffect(() => {
        queryData(activeKey);
        if (timer === null) {
            timer = setInterval(() => {
                (() => {
                    queryData(activeKey);
                })();
            }, 1000 * 10);
        }
        return () => {
            if (timer !== null) {
                clearInterval(timer);
                timer = null;
            }
        }
    }, [activeKey]);

    const getData = (activeKey: string): SpecialBase[] => {
        switch (activeKey) {
            case SpiTab.All:
                return getAllTopData();
            case SpiTab.Signal:
            case SpiTab.Camera:
            case SpiTab.Others:
                return specialWapTopData;
            case SpiTab.Hotspot:
                return specialHotsportTopData;
            case SpiTab.Terminal:
                return specialTerminalTopData;
            case SpiTab.Wiretap:
                return specialWiretapTopData;
            default:
                return [];
        }
    }

    const onTabChange = (tabKey: string) => setActiveKey(tabKey.toString());

    return <WapInfoBox>
        <DisplayPanel>
            <div className="caption">
                <span>专项检查Top10</span>
                <a
                    onClick={() => setDetailModalOpen(true)}
                    style={{ color: '#fff' }}>详细</a>
            </div>
            <div className="content">
                <Tabs
                    onChange={onTabChange}
                    items={toTabItem(getData(activeKey), activeKey as SpiTab, specialTopLoading)}
                    activeKey={activeKey}
                    defaultActiveKey={SpiTab.All}
                    destroyInactiveTabPane={false}
                    moreIcon={<DoubleRightOutlined />}
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