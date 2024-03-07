import electron from 'electron';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Empty, Tabs, message } from 'antd';
import { useModel } from '@/model';
import { DisplayPanel } from '@/component/panel';
import { ScrollPanel } from '@/component/panel/panel';
import { Protocol } from '@/schema/protocol';
import { SpecialBase } from '@/schema/special-base';
import {
    TopList,
    WapList,
    TerminalList,
    BluetoothList,
    HotspotList,
    TotalList,
    WiretapList
} from '../top-list';
import DetailModal from '../detail-modal';
import { EmptyBox, WapInfoBox } from './styled/style';
import { WapInfoProp, SpiTab } from './prop';

const { ipcRenderer } = electron;

/**
 * 数据转TabItem
 * @param data 专项检查数据
 * @param type 标签页枚举
 */
const toTabItem = (data: SpecialBase[], type: SpiTab) => [{
    key: SpiTab.All,
    label: '全部',
    children: <ScrollPanel>
        <TotalList data={data} type={type} />
    </ScrollPanel>
}, {
    key: SpiTab.Signal,
    label: '制式信号',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <WapList data={data} type={type} />
        }
    </ScrollPanel>
}, {
    key: SpiTab.Hotspot,
    label: '热点',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <HotspotList data={data} type={type} />
        }
    </ScrollPanel>
}, {
    key: SpiTab.Bluetooth,
    label: '蓝牙',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <BluetoothList data={data} type={type} />
        }
    </ScrollPanel>
}, {
    key: SpiTab.Wiretap,
    label: '摄像头',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <WiretapList data={data} type={type} />
        }
    </ScrollPanel>
}, {
    key: SpiTab.Terminal,
    label: '终端',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <TerminalList data={data} type={type} />
        }
    </ScrollPanel>
}, {
    key: SpiTab.Others,
    label: '窃密信号',
    children: <ScrollPanel>
        {
            data.length === 0
                ? <EmptyBox><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></EmptyBox>
                : <TopList data={data} type={type} />
        }
    </ScrollPanel>
}];


/**
 * 专项检查数据（，手机信号，其他等）
 */
const WapInfo: FC<WapInfoProp> = ({ }) => {

    const navigate = useNavigate();

    const {
        specialWapTopData,
        specialHotsportTopData,
        specialTerminalTopData,
        specialWiretapTopData,
        specialBluetoothTopData,
        specialDetailModalOpen,
        specialActiveKey,
        setSpecialActiveKey,
        setSpecialDetailModalOpen,
        clearAllTopData,
        getAllTopData,
        queryAllTopData,
        querySpecialWapTopData,
        querySpecialHotspotTopData,
        querySpecialTerminalTopData,
        querySpecialBluetoothTopData,
        querySpecialWiretapTopData
    } = useModel(state => ({
        specialWapTopData: state.specialWapTopData,
        specialHotsportTopData: state.specialHotsportTopData,
        specialTerminalTopData: state.specialTerminalTopData,
        specialBluetoothTopData: state.specialBluetoothTopData,
        specialWiretapTopData: state.specialWiretapTopData,
        specialDetailModalOpen: state.specialDetailModalOpen,
        specialActiveKey: state.specialActiveKey,
        setSpecialActiveKey: state.setSpecialActiveKey,
        setSpecialDetailModalOpen: state.setSpecialDetailModalOpen,
        clearAllTopData: state.clearAllTopData,
        getAllTopData: state.getAllTopData,
        queryAllTopData: state.queryAllTopData,
        querySpecialWapTopData: state.querySpecialWapTopData,
        querySpecialHotspotTopData: state.querySpecialHotspotTopData,
        querySpecialTerminalTopData: state.querySpecialTerminalTopData,
        querySpecialBluetoothTopData: state.querySpecialBluetoothTopData,
        querySpecialWiretapTopData: state.querySpecialWiretapTopData
    }));

    /**
     * 查询全部Top10
     */
    const queryAllTop = () => queryAllTopData();

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
                case SpiTab.Bluetooth:
                    await querySpecialBluetoothTopData();
                    break;
                case SpiTab.Terminal:
                    await querySpecialTerminalTopData([
                        Protocol.WiFi24G,
                        Protocol.WiFi58G
                    ]);
                    break;
                case SpiTab.Wiretap:
                    await querySpecialWiretapTopData([
                        // Protocol.Detectaphone
                        Protocol.Camera //NOTE:2024-01-08,摄像头暂为查询枚举值15
                    ]);
                    break;
                case SpiTab.Others:
                    await querySpecialWapTopData([
                        Protocol.Others
                    ]);
                    break;
            }
        } catch (error) {
            message.warning(`查询失败,${error.message}`);
        }
    };

    const autoQueryData = () => {
        queryData(specialActiveKey);
    };

    useEffect(() => {
        ipcRenderer.on('query-each-20', autoQueryData);
        return () => {
            ipcRenderer.off('query-each-20', autoQueryData);
        };
    }, [autoQueryData, specialActiveKey]);

    useEffect(() => {
        queryData(specialActiveKey);
    }, [specialActiveKey]);

    const getData = (activeKey: string): SpecialBase[] => {
        switch (activeKey) {
            case SpiTab.All:
                return getAllTopData();
            case SpiTab.Signal:
            case SpiTab.Others:
                return specialWapTopData;
            case SpiTab.Hotspot:
                return specialHotsportTopData;
            case SpiTab.Terminal:
                return specialTerminalTopData;
            case SpiTab.Bluetooth:
                return specialBluetoothTopData;
            case SpiTab.Wiretap:
                return specialWiretapTopData;
            default:
                return [];
        }
    }

    const onTabChange = (tabKey: string) => {
        clearAllTopData();
        setSpecialActiveKey(tabKey as SpiTab);
    };

    return <WapInfoBox>
        <DisplayPanel>
            <div className="caption">
                <span>专项检查Top10</span>
                <a
                    onClick={() => navigate(`/special-detail/${specialActiveKey}`)}
                    style={{ color: '#fff' }}>更多</a>
            </div>
            <div className="content">
                <Tabs
                    onChange={onTabChange}
                    items={toTabItem(getData(specialActiveKey), specialActiveKey)}
                    activeKey={specialActiveKey}
                    defaultActiveKey={SpiTab.All}
                    destroyInactiveTabPane={false}
                    moreIcon={<DoubleRightOutlined />}
                    type="card"
                    className="wap-tab" />
            </div>
        </DisplayPanel>
        <DetailModal
            open={specialDetailModalOpen}
            defaultTabKey={specialActiveKey as SpiTab}
            onCancel={() => setSpecialDetailModalOpen(false)}
            onOk={() => setSpecialDetailModalOpen(false)} />
    </WapInfoBox>;
};

export { WapInfo };