import { FC, MouseEvent, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { Protocol } from '@/schema/protocol';
import { useModel } from '@/model';
import WapTable from '../wap-table';
import HotspotTable from '../hotspot-table';
import TerminalTable from '../terminal-table';
import { DetailModalProp } from './prop';

/**
 * 专项检查详情框
 */
const DetailModel: FC<DetailModalProp> = ({ open, protocol, onCancel }) => {

    useEffect(() => {
        if (open) {
            querySpecialWapTop10Data();
        }
    }, [open]);

    const {
        querySpecialWapTop10Data
    } = useModel(state => ({
        querySpecialWapTop10Data: state.querySpecialWapTop10Data
    }));

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
            case Protocol.Hotspot:
                return '热点详情';
            case Protocol.Terminal:
                return '终端详情';
            default:
                return '专项检查详情';
        }
    };

    const renderTable = () => {
        switch (protocol) {
            case Protocol.Hotspot:
                return <HotspotTable />;
            case Protocol.Terminal:
                return <TerminalTable />;
            default:
                return <WapTable />;
        }
    }

    return <Modal
        footer={[
            <Button onClick={onCancelClick} type="default" key="SDM_0">取消</Button>
            // <Button onClick={onOkClick} type="primary" key="SDM_1">确定</Button>
        ]}
        onCancel={onCancelClick}
        open={open}
        width={1000}
        getContainer="#app"
        title={getTitle()}
        centered={true}
        destroyOnClose={true}
        maskClosable={false}
        forceRender={true}
    >
        {renderTable()}
    </Modal>
};

export { DetailModel };