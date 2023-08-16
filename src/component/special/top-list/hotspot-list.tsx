import { FC } from 'react';
import { Spin } from 'antd';
import { helper } from '@/utility/helper';
import { NoWarpLabel } from '@/component/panel/panel';
import { Hotspot } from '@/schema/hotspot';
import { getProtocolLabel } from '@/schema/protocol';
import { ListBox } from './styled/box';
import { TopListProp } from './prop';

/**
 * 热点Top10列表组件
 */
const HotspotList: FC<TopListProp> = ({ data, type, loading }) => {

    /**
     * 渲染广商名称
     */
    const renderOrg = (item: Hotspot) => {
        if (helper.isNullOrUndefined(item?.org)) {
            return ''
        } else {
            return `(${item.org})`
        }
    }

    const renderList = () => data.map(
        (item, index) => <div className="list-row" key={`WL_${index}`}>
            <div className="list-row-txt">
                <NoWarpLabel width={340}>{`${(item as Hotspot)?.mac ?? '-'} ${renderOrg(item as Hotspot)}`}</NoWarpLabel>
                <div>{helper.isNullOrUndefined(item?.siteName) || item?.siteName === '' ? '-' : item?.siteName}</div>
            </div>
            <div className="list-row-val">
                <div>强度：{item.rssi}</div>
                <div>{getProtocolLabel(item.protocolType)}</div>
            </div>
        </div>);

    return <Spin tip="加载中" spinning={loading}>
        <ListBox>
            {renderList()}
        </ListBox>
    </Spin>
};

HotspotList.defaultProps = {
    data: [],
    loading: false
};

export { HotspotList };