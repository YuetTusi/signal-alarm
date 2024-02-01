import { FC } from 'react';
import { Hotspot } from '@/schema/hotspot';
import { Wifi } from './wifi';
import { ListBox } from './styled/box';
import { TopListProp } from './prop';

/**
 * 热点Top10列表组件
 */
const HotspotList: FC<TopListProp> = ({ data }) => {

    const renderList = () => data.map(
        (item, index) => <div className="list-row" key={`WL_${index}`}>
            <Wifi data={item as Hotspot} />
        </div>);

    return <ListBox>
        {renderList()}
    </ListBox>
};

HotspotList.defaultProps = {
    data: []
};

export { HotspotList };