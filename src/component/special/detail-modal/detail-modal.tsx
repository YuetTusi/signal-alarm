import { FC, MouseEvent, useEffect, useState } from 'react';
import { Modal, Tabs } from 'antd';
import {
    WapTable,
    HotspotTable,
    TerminalTable,
    BluetoothTable,
    CameraTable,
    WiretapTable,
    OthersTable
} from '../detail-table';
import { useModel } from '@/model';
import { ModalBox } from './styled/box';
import { SpiTab } from '../wap-info/prop';
import { DetailModalProp } from './prop';

/**
 * 专项检查详情框
 */
const DetailModel: FC<DetailModalProp> = ({ open, defaultTabKey, onCancel }) => {

    const [tabKey, setTabKey] = useState<string>();
    const {
        queryDeviceList,
        setSpecialDefaultHotspotName
    } = useModel(state => ({
        queryDeviceList: state.queryDeviceList,
        setSpecialDefaultHotspotName: state.setSpecialDefaultHotspotName
    }));

    useEffect(() => {
        if (open) {
            queryDeviceList();
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            switch (defaultTabKey) {
                case SpiTab.All:
                    setTabKey(SpiTab.Signal);
                    break;
                default:
                    setTabKey(defaultTabKey);
                    break;
            }
        }
    }, [open, defaultTabKey]);

    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        setTabKey(SpiTab.Signal);
        setSpecialDefaultHotspotName(undefined);
        onCancel();
    };

    return <Modal
        footer={null}
        onCancel={onCancelClick}
        open={open}
        width={1680}
        getContainer="#app"
        title="专项检查详情"
        centered={true}
        destroyOnClose={false}
        maskClosable={false}
        forceRender={true}
    >
        <ModalBox>
            <Tabs
                items={[
                    {
                        key: SpiTab.Signal,
                        label: '制式信号',
                        children: <WapTable parentOpen={open} />
                    }, {
                        key: SpiTab.Hotspot,
                        label: '热点',
                        children: <HotspotTable parentOpen={open} />
                    }, {
                        key: SpiTab.Bluetooth,
                        label: '蓝牙',
                        children: <BluetoothTable parentOpen={open} />
                    }, {
                        key: SpiTab.Wiretap,
                        // label: '窃听器',
                        label: '摄像头',
                        children: <CameraTable parentOpen={open} />
                        // children: <WiretapTable parentOpen={open} />
                    }, {
                        key: SpiTab.Terminal,
                        label: '终端',
                        children: <TerminalTable parentOpen={open} />
                    }, {
                        key: SpiTab.Others,
                        label: '其他',
                        children: <OthersTable parentOpen={open} />
                    }
                ]}
                activeKey={tabKey}
                destroyInactiveTabPane={true}
                onChange={(activeKey: string) => setTabKey(activeKey)}
            />
        </ModalBox>
    </Modal>
};

export { DetailModel };