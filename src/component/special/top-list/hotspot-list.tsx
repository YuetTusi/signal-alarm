import { FC } from 'react';
import { Spin } from 'antd';
import { Hotspot } from '@/schema/hotspot';
import { Wifi } from './wifi';
import { ListBox } from './styled/box';
import { TopListProp } from './prop';

/**
 * 热点Top10列表组件
 */
const HotspotList: FC<TopListProp> = ({ data, type, loading }) => {

    const renderList = () => data.map(
        (item, index) => <div className="list-row" key={`WL_${index}`}>
            <Wifi data={item as Hotspot} />
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