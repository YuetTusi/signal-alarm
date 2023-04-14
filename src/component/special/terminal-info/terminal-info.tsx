import { FC, useState } from 'react';
import { DisplayPanel } from '@/component/panel';
import { Protocol } from '@/schema/protocol';
import TerminalList from './terminal-list';
import DetailModal from '../detail-modal';
import { TerminalInfoBox } from './styled/box';

/**
 * 专项检查数据（终端）
 */
const TerminalInfo: FC<{}> = () => {

    const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);

    return <TerminalInfoBox>
        <DisplayPanel>
            <div className="caption">
                <span>终端信息</span>
                <a
                    onClick={() => setDetailModalOpen(true)}
                    style={{ color: '#fff' }}>详细</a>
            </div>
            <div className="content">
                <TerminalList />
            </div>
        </DisplayPanel>
        <DetailModal
            open={detailModalOpen}
            protocol={Protocol.Terminal}
            onCancel={() => setDetailModalOpen(false)}
            onOk={() => setDetailModalOpen(false)} />
    </TerminalInfoBox>;
};

export { TerminalInfo };