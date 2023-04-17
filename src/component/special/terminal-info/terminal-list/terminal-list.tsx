import { FC, useEffect } from 'react';
import { Empty, Spin } from 'antd';
import { State, useModel } from '@/model';
import { ListBox } from './styled/box';
import { TerminalTopProp } from './prop';
import { getProtocolLabel } from '@/schema/protocol';

let timer: any = null;

/**
 * 专项数据（终端）Top10
 */
const TerminalList: FC<TerminalTopProp> = ({ }) => {

    useEffect(() => {

        querySpecialTerminalTop10Data();
        if (timer === null) {
            timer = setInterval(() => {
                querySpecialTerminalTop10Data();
            }, 1000 * 20);
        }

        return () => {
            clearInterval(timer);
        }
    }, []);

    const {
        specialTerminalLoading,
        specialTerminalTop10Data,
        querySpecialTerminalTop10Data
    } = useModel((state: State) => ({
        specialTerminalTop10Data: state.specialTerminalTop10Data,
        specialTerminalLoading: state.specialTerminalLoading,
        querySpecialTerminalTop10Data: state.querySpecialTerminalTop10Data
    }));


    const renderList = () => {

        return specialTerminalTop10Data.length === 0
            ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            : specialTerminalTop10Data.map((item, index) => <div className="list-row" key={`WL_${index}`}>
                <div className="list-row-txt">
                    <div>{getProtocolLabel(item.protocolType)}</div>
                    <div>{item?.siteName ?? ''}</div>
                </div>
                <div className="list-row-val">
                    <div>强度值：{item.rssi}</div>
                </div>
            </div>)
    };

    return <Spin tip="加载中" spinning={specialTerminalLoading}>
        <ListBox>
            {renderList()}
        </ListBox>
    </Spin>
};

export { TerminalList };