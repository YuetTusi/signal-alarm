import { FC, useEffect } from 'react';
import { Empty, Spin } from 'antd';
import { useModel } from '@/model';
import { Protocol } from '@/schema/protocol';
import { ListBox } from './styled/box';
import { WapTopProp } from './prop';
import { helper } from '@/utility/helper';

/**
 * 专项数据（摄像头，手机信号等）Top10
 */
const WapList: FC<WapTopProp> = ({ protocol }) => {

    useEffect(() => {
        querySpecialWapTop10Data();
    }, []);

    const {
        specialWapLoading,
        specialWapTop10Data,
        querySpecialWapTop10Data
    } = useModel((state) => ({
        specialWapLoading: state.specialWapLoading,
        specialWapTop10Data: state.specialWapTop10Data,
        querySpecialWapTop10Data: state.querySpecialWapTop10Data
    }));

    /**
     * 按Protocol字典类型过滤数据
     */
    const filterData = () =>
        protocol === Protocol.All
            ? specialWapTop10Data
            : specialWapTop10Data.filter(item => item.protocolType === protocol);


    const renderList = () => {

        const data = filterData();

        return data.length === 0
            ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            : data.map(
                (item, index) => <div className="list-row" key={`WL_${index}`}>
                    <div className="list-row-txt">
                        <div>{helper.isNullOrUndefined(item?.protocolName) || item.protocolName === '' ? '-' : item.protocolName}</div>
                        <div>{item?.siteName ?? '-'}</div>
                    </div>
                    <div className="list-row-val">
                        <div>强度值：{item.rssi}</div>
                    </div>
                </div>
            );
    };

    return <Spin tip="加载中" spinning={specialWapLoading}>
        <ListBox>
            {renderList()}
        </ListBox>
    </Spin>
};

WapList.defaultProps = {
    protocol: Protocol.All
};

export { WapList };