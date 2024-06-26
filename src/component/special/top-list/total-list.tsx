import round from 'lodash/round';
import { FC } from 'react';
import { helper } from '@/utility/helper';
import { NoWarpLabel } from '@/component/panel/panel';
import { Hotspot } from '@/schema/hotspot';
import { SpecialBase } from '@/schema/special-base';
import { Protocol } from '@/schema/protocol';
import { Terminal as TerminalData } from '@/schema/terminal';
import { Bluetooth as BluetoothEntity } from '@/schema/bluetooth';
import Signal from '@/component/signal';
import { ContentLabel } from './content-label';
import { Wifi } from './wifi';
import { Terminal } from './terminal';
import { CategoryTag } from './category-tag';
import { Bluetooth } from './bluetooth';
import { ListBox } from './styled/box';
import { TotalListProp } from './prop';

/**
 * Top10全部列表组件
 */
const TotalList: FC<TotalListProp> = ({ data, type }) => {

    /**
     * 渲染频率值
     */
    const renderArfcn = (data: SpecialBase) => {
        if (helper.isNullOrUndefined((data as any)?.arfcn)) {
            return null;
        } else {
            return <span className="arf">[{round((data as any).arfcn, 1)}MHz]</span>
        }
    };

    const renderContent = (item: SpecialBase) => {

        if ((item as any).staId || (item as any).isConnect) {
            //如果存在`staId`或`isConnect`，显示为终端类型
            return <Terminal data={item as TerminalData} />;
        } else {
            switch (item.protocolType) {
                case Protocol.WiFi24G:
                case Protocol.WiFi58G:
                    return <Wifi data={item as Hotspot} />;
                case Protocol.Bluetooth50:
                    return <Bluetooth data={item as BluetoothEntity} />;
                default:
                    return <>
                        <div className="inner-row">
                            <div className="list-row-txt note">
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
        }
    };

    const renderList = () => data.map(
        (item, index) => <div className="list-row" key={`WL_${index}`}>
            {renderContent(item)}
        </div>);

    return <ListBox>
        {renderList()}
    </ListBox>
};

TotalList.defaultProps = {
    data: []
};

export { TotalList };