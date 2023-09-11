import { FC } from 'react';
import { Spin } from 'antd';
import { helper } from '@/utility/helper';
import Signal from '@/component/signal';
import { ContentLabel } from './content-label';
import { ListBox } from './styled/box';
import { TopListProp } from './prop';
import { CategoryTag } from './category-tag';


/**
 * Top10列表组件
 */
const TopList: FC<TopListProp> = ({ data, type, loading }) => {

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
                    <CategoryTag data={item} />
                </div>
                <div className="list-row-val">
                    {item.captureTime}
                </div>
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