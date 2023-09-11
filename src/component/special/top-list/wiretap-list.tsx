import { FC } from 'react';
import { Spin } from 'antd';
import { helper } from '@/utility/helper';
// import { Hotspot } from '@/schema/hotspot';
import { getProtocolLabel } from '@/schema/protocol';
import { ContentLabel } from './content-label';
import { ListBox } from './styled/box';
import { TopListProp } from './prop';
import Signal from '@/component/signal';

/**
 * 窃听器Top10列表组件
 */
const WiretapList: FC<TopListProp> = ({ data, type, loading }) => {

    const renderList = () => data.map(
        (item, index) => <div className="list-row" key={`WL_${index}`}>
            <div className="inner-row">
                <div className="list-row-txt">
                    <ContentLabel type={type} data={item} />
                </div>
                <div className="list-row-val">
                    <Signal value={Number(item?.rssi)} max={0} min={-100} />
                </div>
            </div>
            <div className="inner-row">
                <div className="list-row-txt">
                    [窃听器]
                </div>
                <div className="list-row-val">
                    {getProtocolLabel(item.protocolType)}
                </div>
            </div>
        </div>);

    return <Spin tip="加载中" spinning={loading}>
        <ListBox>
            {renderList()}
        </ListBox>
    </Spin>
};

WiretapList.defaultProps = {
    data: [],
    loading: false
};

export { WiretapList };