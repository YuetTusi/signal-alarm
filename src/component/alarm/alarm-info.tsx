import { FC, useState } from 'react';
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
            <div className="content">
                <AlarmTop />
            </div>
        </DisplayPanel>
        <DetailModal
            open={detailModalOpen}
            onCancel={() => setDetailModalOpen(false)} />
    </AlarmInfoBox>;
};

export { AlarmInfo };