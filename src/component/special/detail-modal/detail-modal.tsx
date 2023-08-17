import { FC, MouseEvent, useState } from 'react';
import { Button, Modal, Tabs } from 'antd';
import { Protocol } from '@/schema/protocol';
import { WapTable, HotspotTable, TerminalTable } from '../detail-table';
import { ModalBox } from './styled/box';
import { DetailModalProp, DetailTab } from './prop';

/**
 * 专项检查详情框
 */
const DetailModel: FC<DetailModalProp> = ({ open, protocol, onCancel }) => {

    const [tabKey, setTabKey] = useState<string>(DetailTab.Wap);

    const onCancelClick = (event: MouseEvent) => {
        event.preventDefault();
        setTabKey(DetailTab.Wap);
        onCancel();
    };

    return <Modal
        footer={null}
        onCancel={onCancelClick}
        open={open}
        width={1330}
        getContainer="#app"
        title="专项检查详情"
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
                        label: '制式信号',
                        children: <WapTable parentOpen={open} />
                    }, {
                        key: DetailTab.Hotspot,
                        label: '热点',
                        children: <HotspotTable parentOpen={open} />
                    }, {
                        key: DetailTab.Terminal,
                        label: '终端',
                        children: <TerminalTable parentOpen={open} />
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