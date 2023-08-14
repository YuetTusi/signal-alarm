import { FC } from 'react';
import { Spin } from 'antd';
import { helper } from '@/utility/helper';
import { getProtocolLabel } from '@/schema/protocol';
import { ContentLabel } from './content-label';
import { ListBox } from './styled/box';
import { TotalListProp } from './prop';

/**
 * Top10全部列表组件
 */
const TotalList: FC<TotalListProp> = ({ data, type, loading }) => {

    const renderList = () => data.map(
        (item, index) => <div className="list-row" key={`WL_${index}`}>
            <div className="list-row-txt">
                <ContentLabel type={type} data={item} />
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

TotalList.defaultProps = {
    data: [],
    loading: false
};

export { TotalList };