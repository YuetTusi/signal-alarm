import { FC, useEffect } from 'react';
import { Empty, Spin } from 'antd';
import { State, useModel } from '@/model';
import { getProtocolLabel } from '@/schema/protocol';
import { ListBox } from './styled/box';
import { HotspotListProp } from './prop';

/**
 * 专项数据（终端）Top10
 */
const HotspotList: FC<HotspotListProp> = ({ protocol }) => {

    useEffect(() => {
        Promise.all([
            querySpecialHotspotTop10Data(),
        ]);
    }, []);

    const {
        specialHotspotLoading,
        specialHotspotTop10Data,
        querySpecialHotspotTop10Data
    } = useModel((state: State) => ({
        specialHotspotLoading: state.specialHotspotLoading,
        specialHotspotTop10Data: state.specialHotspotTop10Data,
        querySpecialHotspotTop10Data: state.querySpecialHotspotTop10Data
    }));

    const filterData = () =>
        specialHotspotTop10Data.filter(item => item.protocolType === protocol);

    const renderList = () => {

        const data = filterData();

        return data.length === 0
            ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            : data.map((item, index) => <div className="list-row" key={`WL_${index}`}>
                <div className="list-row-txt">
                    <div>{getProtocolLabel(item.protocolType)}</div>
                    <div>{item?.siteName ?? ''}</div>
                </div>
                <div className="list-row-val">
                    <div>强度值：{item.rssi}</div>
                </div>
            </div>)
    };

    return <Spin tip="加载中" spinning={specialHotspotLoading}>
        <ListBox>
            {renderList()}
        </ListBox>
    </Spin>
};

export { HotspotList };