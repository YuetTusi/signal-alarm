import { FC } from 'react';
import { Spin } from 'antd';
import { helper } from '@/utility/helper';
import { NoWarpLabel } from '@/component/panel/panel';
import Signal from '@/component/signal';
import { SpecialBase } from '@/schema/special-base';
import { ListBox, ProtocolIcon } from './styled/box';
import { TopListProp } from './prop';
import BluetoothBle from '@/assets/image/bluethooth-ble.png';
import BluetoothClassic from '@/assets/image/bluethooth-classic.png';

/**
 * 蓝牙Top10列表组件
 */
const BluetoothList: FC<TopListProp> = ({ data, loading }) => {

    /**
     * 渲染广商名称
     */
    const renderOrg = (item: any) => {
        if (helper.isNullOrUndefined(item?.org)) {
            return ''
        } else {
            return `(${item.org})`
        }
    }

    const renderIcon = (data: SpecialBase) => {
        const type = (data as any).type;
        return <ProtocolIcon
            url={type === 'ble' ? BluetoothBle : BluetoothClassic}
            title={type === 'ble' ? '低功耗蓝牙' : '经典蓝牙'}
            className={data.isConnect === 0 ? 'disconnect' : undefined} />;
    };

    const renderContent = (item: SpecialBase) => {
        return <>
            <div className="inner-row">
                <div className="list-row-txt">
                    <NoWarpLabel
                        title={`${(item as any)?.mac ?? '-'} ${renderOrg(item as any)}`}
                        width={340}>
                        {`${(item as any)?.mac ?? '-'} ${renderOrg(item as any)}`}
                    </NoWarpLabel>
                </div>
                <div className="list-row-val">
                    <Signal value={Number(item?.rssi)} max={0} min={-100} />
                </div>
            </div>
            <div className="inner-row">
                <div
                    title={`${helper.isNullOrUndefined(item?.siteName) || item?.siteName === '' ? '-' : item?.siteName}`}
                    className="list-row-txt">
                    {renderIcon(item)}
                    {helper.isNullOrUndefined(item?.siteName) || item?.siteName === '' ? '-' : item?.siteName}
                </div>
                <div className="list-row-val">
                    <NoWarpLabel width={130}>{item.captureTime}</NoWarpLabel>
                </div>
            </div>
        </>;
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

BluetoothList.defaultProps = {
    data: [],
    loading: false
};

export { BluetoothList };