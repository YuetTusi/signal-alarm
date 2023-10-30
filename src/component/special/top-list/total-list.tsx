import { FC } from 'react';
import { Spin } from 'antd';
import { helper } from '@/utility/helper';
import { NoWarpLabel } from '@/component/panel/panel';
import { Hotspot } from '@/schema/hotspot';
import { SpecialBase } from '@/schema/special-base';
import { Protocol } from '@/schema/protocol';
import { Terminal as TerminalData } from '@/schema/terminal';
import Signal from '@/component/signal';
import { ContentLabel } from './content-label';
import { Wifi } from './wifi';
import { Terminal } from './terminal';
import { CategoryTag } from './category-tag';
import { ListBox } from './styled/box';
import { TotalListProp } from './prop';
import { Bluetooth } from './bluetooth';
import { Bluetooth as BluetoothEntity } from '@/schema/bluetooth';

/**
 * Top10全部列表组件
 */
const TotalList: FC<TotalListProp> = ({ data, type, loading }) => {

    /**
     * 渲染频点值
     */
    const renderArfcn = (data: SpecialBase) => {
        if (helper.isNullOrUndefined((data as any)?.arfcn)) {
            return null;
        } else {
            return <span className="arf">[{(data as any).arfcn}]</span>
        }
    };

    const renderContent = (item: SpecialBase) => {
        switch (item.protocolType) {
            case Protocol.WiFi24G:
            case Protocol.WiFi58G:
                if ((item as TerminalData).isTerminal) {
                    return <Terminal data={item as TerminalData} />;
                } else if ((item as BluetoothEntity).isBluetooth) {
                    return <Bluetooth data={item as BluetoothEntity} />
                } else {
                    return <Wifi data={item as Hotspot} />;
                }
            default:
                return <>
                    <div className="inner-row">
                        <div className="list-row-txt">
                            <ContentLabel type={type} data={item} />
                            {renderArfcn(item)}
                        </div>
                        <div className="list-row-val">
                            <Signal value={Number(item?.rssi)} max={0} min={-100} />
                        </div>
                    </div>
                    <div className="inner-row">
                        <div className="list-row-txt">
                            <CategoryTag data={item} />
                            <NoWarpLabel width={220} title={item.siteName}>{item.siteName ?? '-'}</NoWarpLabel>
                        </div>
                        <div className="list-row-val">
                            {item.captureTime}
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

TotalList.defaultProps = {
    data: [],
    loading: false
};

export { TotalList };