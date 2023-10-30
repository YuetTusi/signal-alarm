import BluetoothBle from '@/assets/image/bluethooth-ble.png';
import BluetoothClassic from '@/assets/image/bluethooth-classic.png';
import { FC } from 'react';
import { Spin } from 'antd';
import { helper } from '@/utility/helper';
import { NoWarpLabel } from '@/component/panel/panel';
import Signal from '@/component/signal';
import { Bluetooth as BluetoothEntity } from '@/schema/bluetooth';
import { ListBox, ProtocolIcon } from './styled/box';
import { TopListProp } from './prop';
import { SpecialBase } from '@/schema/special-base';

/**
 * 蓝牙
 */
const Bluetooth: FC<{ data: BluetoothEntity }> = ({ data }) => {

    // console.log(data);
    /**
     * 渲染广商名称
     */
    const renderOrg = (item: any) => {
        if (helper.isNullOrUndefined(item?.vendor)) {
            return ''
        } else {
            return `(${item.vendor})`
        }
    }

    const renderIcon = (data: BluetoothEntity) => {
        const type = (data as any).type;
        return <ProtocolIcon
            url={type === 'ble' ? BluetoothBle : BluetoothClassic}
            title={type === 'ble' ? '低功耗蓝牙' : '经典蓝牙'}
            className={data.isConnect === 0 ? 'disconnect' : undefined} />;
    };

    return <>
        <div className="inner-row">
            <div className="list-row-txt">
                <NoWarpLabel
                    title={`${(data as any)?.mac ?? '-'} ${renderOrg(data as any)}`}
                    width={340}>
                    {`${(data as any)?.mac ?? '-'} ${renderOrg(data as any)}`}
                </NoWarpLabel>
            </div>
            <div className="list-row-val">
                <Signal value={Number((data as any).signal)} max={0} min={-100} />
            </div>
        </div>
        <div className="inner-row">
            <div
                title={`${helper.isNullOrUndefined(data?.siteName) || data?.siteName === '' ? '-' : data?.siteName}`}
                className="list-row-txt">
                {renderIcon(data)}
                {helper.isNullOrUndefined(data?.siteName) || data?.siteName === '' ? '-' : data?.siteName}
            </div>
            <div className="list-row-val">
                <NoWarpLabel width={130}>{data.captureTime}</NoWarpLabel>
            </div>
        </div>
    </>;
};

/**
 * 蓝牙Top10列表组件
 */
const BluetoothList: FC<TopListProp> = ({ data, loading }) => {

    const renderList = () => data.map(
        (item, index) => <div className="list-row" key={`WL_${index}`}>
            <Bluetooth data={item as BluetoothEntity} key={`WL_${index}`} />
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

export { BluetoothList, Bluetooth };