import { FC } from 'react';
import { NoWarpLabel } from '@/component/panel/panel';
import { helper } from '@/utility/helper';
import Signal from '@/component/signal';
import { Hotspot } from '@/schema/hotspot';
import { Protocol } from '@/schema/protocol';
import wifi24 from '@/assets/image/wifi24.png';
import wifi58 from '@/assets/image/wifi58.png';
import { ProtocolIcon } from './styled/box';

/**
 * 渲染WiFi内容
 */
const Wifi: FC<{ data: Hotspot }> = ({ data }) => {
    return <>
        <div className="inner-row">
            <div className="list-row-txt">
                <NoWarpLabel
                    title={`${data?.mac ?? '-'} ${helper.isNullOrUndefined(data?.org) ? '' : `（${data.org}）`}`}
                    width={360}>
                    {
                        `${data?.mac ?? '-'} ${helper.isNullOrUndefined(data?.org) ? '' : `（${data.org}）`}`
                    }
                </NoWarpLabel>
            </div>
            <div className="list-row-val">
                <Signal value={Number(data?.rssi)} max={0} min={-100} />
            </div>
        </div>
        <div className="inner-row">
            <div className="list-row-txt">
                {
                    data.protocolType === Protocol.WiFi24G
                        ? <ProtocolIcon url={wifi24} /> : <ProtocolIcon url={wifi58} />
                }
                <NoWarpLabel title={`${data?.ssid ?? ''}（${data?.siteName ?? '-'}）`} width={230}>
                    {`${data?.ssid ?? ''}（${data?.siteName ?? '-'}）`}
                </NoWarpLabel>
            </div>
            <div className="list-row-val">
                <NoWarpLabel width={130}>{data.captureTime}</NoWarpLabel>
            </div>
        </div>
    </>;
};

export { Wifi };