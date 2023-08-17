import { FC } from 'react';
import { Spin } from 'antd';
import { helper } from '@/utility/helper';
import Signal from '@/component/signal';
import { getProtocolLabel } from '@/schema/protocol';
import { ContentLabel } from './content-label';
import { ListBox } from './styled/box';
import { TopListProp } from './prop';


/**
 * Top10列表组件
 */
const TopList: FC<TopListProp> = ({ data, type, loading }) => {

    const renderList = () => data.map(
        (item, index) => <div className="list-row" key={`WL_${index}`}>
            <div className="list-row-txt">
                <ContentLabel type={type} data={item} />
                <div>{helper.isNullOrUndefined(item?.siteName) || item?.siteName === '' ? '-' : item?.siteName}</div>
            </div>
            <div className="list-row-val">
                <div><Signal value={Number(item?.rssi)} max={0} min={-100} /></div>
                <div>{getProtocolLabel(item.protocolType)}</div>
            </div>
        </div>);

    return <Spin tip="加载中" spinning={loading}>
        <ListBox>
            {renderList()}
        </ListBox>
    </Spin>
};

TopList.defaultProps = {
    data: [],
    loading: false
};

export { TopList };