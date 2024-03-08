import { FC, MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Tabs } from 'antd';
import {
    WapTable,
    HotspotTable,
    TerminalTable,
    BluetoothTable,
    CameraTable,
    OthersTable
} from '@/component/special/detail-table';
import { useModel } from '@/model';
import { useUnmount } from '@/hook';
import { SpiTab } from '@/component/special/wap-info/prop';
import { PageBox, SearchBar, TabBox } from './styled/box';

/**
 * 专项检查详情页
 */
const SpecialDetail: FC<{}> = () => {

    const navigate = useNavigate();
    const { type } = useParams<{ type: SpiTab }>();
    const [tabKey, setTabKey] = useState<string>();
    const {
        queryDeviceList,
        setSpecialDefaultHotspotName
    } = useModel(state => ({
        queryDeviceList: state.queryDeviceList,
        setSpecialDefaultHotspotName: state.setSpecialDefaultHotspotName
    }));

    useUnmount(() => {
        setSpecialDefaultHotspotName(undefined);
    });

    useEffect(() => {
        queryDeviceList();
    }, []);

    useEffect(() => {
        if (type === undefined || type === SpiTab.All) {
            setTabKey(SpiTab.Signal);
        } else {
            setTabKey(type);
        }
    }, [type]);

    /**
     * 返回主页Click
     */
    const onGoBackClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    return <PageBox>
        <SearchBar>
            <Button
                onClick={onGoBackClick}
                type="default">返回主页</Button>
        </SearchBar>
        <TabBox>
            <Tabs
                items={[
                    {
                        key: SpiTab.Signal,
                        label: '制式信号',
                        children: <WapTable parentOpen={type === SpiTab.Signal} />
                    }, {
                        key: SpiTab.Hotspot,
                        label: '热点',
                        children: <HotspotTable parentOpen={type === SpiTab.Hotspot} />
                    }, {
                        key: SpiTab.Bluetooth,
                        label: '蓝牙',
                        children: <BluetoothTable parentOpen={type === SpiTab.Bluetooth} />
                    }, {
                        key: SpiTab.Wiretap,
                        // label: '窃听器',
                        label: '摄像头',
                        children: <CameraTable parentOpen={type === SpiTab.Wiretap} />
                    }, {
                        key: SpiTab.Terminal,
                        label: '终端',
                        children: <TerminalTable parentOpen={type === SpiTab.Terminal} />
                    }, {
                        key: SpiTab.Others,
                        label: '窃密信号',
                        children: <OthersTable parentOpen={type === SpiTab.Others} />
                    }
                ]}
                activeKey={tabKey}
                destroyInactiveTabPane={true}
                onChange={(activeKey: string) => setTabKey(activeKey)}
            />
        </TabBox>
    </PageBox>
};

export { SpecialDetail };