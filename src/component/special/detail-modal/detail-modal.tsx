import { FC, MouseEvent, useEffect, useState } from 'react';
import { Button, Modal, Tabs } from 'antd';
import { Protocol } from '@/schema/protocol';
import { useModel } from '@/model';
import { WapTable, HotspotTable, TerminalTable } from '../detail-table';
// import HotspotTable from '../hotspot-info/hotspot-table';
// import TerminalTable from '../terminal-info/terminal-table';
import { ModalBox } from './styled/box';
import { DetailModalProp, DetailTab } from './prop';
import { SpiTab } from '../wap-info/prop';

/**
 * 专项检查详情框
 */
const DetailModel: FC<DetailModalProp> = ({ open, protocol, onCancel }) => {

    const [tabKey, setTabKey] = useState<string>(DetailTab.Wap);

    // useEffect(() => {
    //     if (open) {
    //         querySpecialWapTop10Data();
    //     }
    // }, [open]);

    // const {
    //     querySpecialWapTop10Data
    // } = useModel(state => ({
    //     querySpecialWapTop10Data: state.querySpecialWapTop10Data
    // }));

    // const onOkClick = (event: MouseEvent) => {
    //     event.preventDefault();
    //     onOk();
    // };

    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        onCancel();
    };

    const getTitle = () => {
        switch (protocol) {
            case Protocol.WiFi24G:
            case Protocol.WiFi58G:
                return '热点详情';
            case Protocol.Terminal:
                return '终端详情';
            default:
                return '专项检查详情';
        }
    };

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="SDM_0">取消</Button>
            // <Button onClick={onOkClick} type="primary" key="SDM_1">确定</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        width={1280}
        getContainer="#app"
        title={getTitle()}
        centered={true}
        destroyOnClose={true}
        maskClosable={false}
        forceRender={true}
    >
        <ModalBox>
            <Tabs
                items={[
                    {
                        key: DetailTab.Wap,
                        label: '手机信号',
                        children: null//<WapTable />
                    }, {
                        key: DetailTab.Hotspot,
                        label: '热点',
                        children: <HotspotTable />
                    }, {
                        key: DetailTab.Terminal,
                        label: '终端',
                        children: <TerminalTable />
                    }
                ]}
                activeKey={tabKey}
                defaultActiveKey={DetailTab.Wap}
                destroyInactiveTabPane={true}
                onChange={(activeKey: string) => setTabKey(activeKey)}
            />
        </ModalBox>
    </Modal>
};

export { DetailModel };