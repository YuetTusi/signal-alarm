import { FC } from 'react';
import { Spin } from 'antd';
import { Wap } from '@/schema/wap';
import Signal from '@/component/signal';
import { NoWarpLabel } from '@/component/panel/panel';
import { ContentLabel } from './content-label';
import { CategoryTag } from './category-tag';
import { ListBox } from './styled/box';
import { TopListProp } from './prop';

/**
 * Top10列表组件
 */
const TopList: FC<TopListProp> = ({ data, type, loading }) => {

    const renderList = () => data.map(
        (item, index) => <div className="list-row" key={`WL_${index}`}>
            <div className="inner-row">
                <div className="list-row-txt note">
                    <ContentLabel type={type} data={item} />
                    <span className="arf">[{(item as Wap).arfcn}]</span>
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