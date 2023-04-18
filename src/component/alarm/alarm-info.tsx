import { FC, useEffect, useState } from 'react';
import { DisplayPanel } from '@/component/panel';
import { DetailModal } from './detail-modal';
import { AlarmTop } from './alarm-top';
import { AlarmInfoBox } from './styled/style';

/**
 * 预警信息
 */
const AlarmInfo: FC<{}> = () => {

    const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);

    return <AlarmInfoBox>
        <DisplayPanel>
            <div className="caption">
                <span>预警信息</span>
                <a
                    onClick={() => setDetailModalOpen(true)}
                    style={{ color: '#fff' }}>详细</a>
            </div>
            <div className="content" style={{
                height: '272px',
                overflowY: 'auto',
                position: 'absolute',
                top: '34px',
                left: 0,
                right: 0,
                bottom: 0
            }}>
                <AlarmTop />
            </div>
        </DisplayPanel>
        <DetailModal
            open={detailModalOpen}
            onCancel={() => setDetailModalOpen(false)} />
    </AlarmInfoBox>;
};

export { AlarmInfo };