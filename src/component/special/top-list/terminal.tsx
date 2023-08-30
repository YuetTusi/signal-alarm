import { FC } from 'react';
import { NoWarpLabel } from '@/component/panel/panel';
import { helper } from '@/utility/helper';
import Signal from '@/component/signal';
import { Terminal as TerminalData } from '@/schema/terminal';
import { Protocol } from '@/schema/protocol';
import { Terminal24, Terminal58, Bluethooth } from './styled/box';

const renderIcon = (data: TerminalData) => {
    switch (data.protocolType) {
        case Protocol.WiFi24G:
            return <Terminal24 />;
        case Protocol.WiFi58G:
            return <Terminal58 />;
        case Protocol.Bluetooth50:
            return <Bluethooth />;
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