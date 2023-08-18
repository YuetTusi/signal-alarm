import { FC } from 'react';
import { Spin } from 'antd';
import { helper } from '@/utility/helper';
import { NoWarpLabel } from '@/component/panel/panel';
import Signal from '@/component/signal';
import { Terminal } from '@/schema/terminal';
import { Protocol, getProtocolLabel } from '@/schema/protocol';
import { ListBox } from './styled/box';
import { TopListProp } from './prop';
import { SpecialBase } from '@/schema/special-base';
import { Wifi } from './wifi';
import { Hotspot } from '@/schema/hotspot';

/**
 * 终端Top10列表组件
 */
const TerminalList: FC<TopListProp> = ({ data, loading }) => {

    /**
     * 渲染广商名称
     */
    const renderOrg = (item: Terminal) => {
        if (helper.isNullOrUndefined(item?.org)) {
            return ''
        } else {
            return `(${item.org})`
        }
    }

    const renderContent = (item: SpecialBase) => {
        switch (item.protocolType) {
            case Protocol.WiFi24G:
            case Protocol.WiFi58G:
                return <Wifi data={item as Hotspot} />
            default:
                return <>
                    <div className="inner-row">
                        <div className="list-row-txt">
                            <NoWarpLabel width={340}>{`${(item as Terminal)?.mac ?? '-'} ${renderOrg(item as Terminal)}`}</NoWarpLabel>
                        </div>
                        <div className="list-row-val">
                            <Signal value={Number(item?.rssi)} max={0} min={-100} />
                        </div>
                    </div>
                    <div className="inner-row">
                        <div className="list-row-txt">
                            {`${getProtocolLabel(item.protocolType)} （${helper.isNullOrUndefined(item?.siteName) || item?.siteName === '' ? '-' : item?.siteName}）`}
                        </div>
                        <div className="list-row-val">
                            <NoWarpLabel width={110}>{item.captureTime}</NoWarpLabel>
                        </div>
                    </div>
                </>;
        }
    };

    const renderList = () => data.map(
        (item, index) => <div className="list-row" key={`WL_${index}`}>
            {renderContent(item)}
        </div>);

    return <Spin tip="加载中" spinning={loading}>
        <ListBox>
            {renderList()}
        </ListBox>
    </Spin>
};

TerminalList.defaultProps = {
    data: [],
    loading: false
};

export { TerminalList };