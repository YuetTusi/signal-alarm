import { FC } from 'react';
import { Spin } from 'antd';
import { helper } from '@/utility/helper';
import { NoWarpLabel } from '@/component/panel/panel';
import { Terminal } from '@/schema/terminal';
import { getProtocolLabel } from '@/schema/protocol';
import { ListBox } from './styled/box';
import { TopListProp } from './prop';

/**
 * 终端Top10列表组件
 */
const TerminalList: FC<TopListProp> = ({ data, loading }) => {

    /**
     * 渲染广商名称
     */
    const renderOrg = (item: Terminal) => {
        if (helper.isNullOrUndefined(item?.org)) {
            return ''
        } else {
            return `(${item.org})`
        }
    }

    const renderList = () => data.map(
        (item, index) => <div className="list-row" key={`WL_${index}`}>
            <div className="list-row-txt">
                <NoWarpLabel width={300}>{`${(item as Terminal)?.mac ?? '-'} ${renderOrg(item as Terminal)}`}</NoWarpLabel>
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

TerminalList.defaultProps = {
    data: [],
    loading: false
};

export { TerminalList };