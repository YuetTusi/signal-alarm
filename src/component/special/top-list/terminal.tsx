import { FC } from 'react';
import { NoWarpLabel } from '@/component/panel/panel';
import { helper } from '@/utility/helper';
import Signal from '@/component/signal';
import { Terminal as TerminalData } from '@/schema/terminal';
import { Protocol } from '@/schema/protocol';
import { ProtocolIcon } from './styled/box';
import bluetooth from '@/assets/image/bluetooth.png';
import terminal24 from '@/assets/image/terminal24.png';
import terminal58 from '@/assets/image/terminal58.png';

const renderIcon = (data: TerminalData) => {
    switch (data.protocolType) {
        case Protocol.WiFi24G:
            return <ProtocolIcon
                url={terminal24}
                title={data.isConnect === 0 ? '设备未连接' : undefined}
                className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.WiFi58G:
            return <ProtocolIcon
                url={terminal58}
                title={data.isConnect === 0 ? '设备未连接' : undefined}
                className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.Bluetooth50:
            return <ProtocolIcon
                url={bluetooth}
                title={data.isConnect === 0 ? '设备未连接' : undefined}
                className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        default:
            return null;
    }
};

/**
 * 渲染终端内容
 */
const Terminal: FC<{ data: TerminalData }> = ({ data }) => {
    return <>
        <div className="inner-row">
            <div className="list-row-txt">
                <div>
                    <NoWarpLabel
                        title={`${data?.mac ?? '-'} ${helper.isNullOrUndefined(data?.org) ? '' : `（${data.org}）`}`}
                        width={360}>
                        {
                            `${data?.mac ?? '-'} ${helper.isNullOrUndefined(data?.org) ? '' : `（${data.org}）`}`
                        }
                    </NoWarpLabel>
                </div>
            </div>
            <div className="list-row-val">
                <Signal value={Number(data?.rssi)} max={0} min={-100} />
            </div>
        </div>
        <div className="inner-row">
            <div className="list-row-txt">
                <div>
                    {renderIcon(data)}
                    <NoWarpLabel title={`${data?.ssid ?? ''}（${data?.siteName ?? '-'}）`} width={230}>
                        {`${data?.ssid ?? ''}（${data?.siteName ?? '-'}）`}
                    </NoWarpLabel>
                </div>
            </div>
            <div className="list-row-val">
                <NoWarpLabel width={110}>{data.captureTime}</NoWarpLabel>
            </div>
        </div>
    </>;
};

export { Terminal };