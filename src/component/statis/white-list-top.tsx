
import { FC, useEffect } from 'react';
import { Tag } from 'antd';
import useModel from '@/model';
import { WhiteList, WhiteListType } from '@/schema/white-list';
import { DisplayPanel } from '../panel';
import { ScrollWhiteList } from './styled/box';

const WhiteListItem: FC<{ data: WhiteList }> = ({ data }) => {

    const renderTypeName = (ruleType: number) => {
        switch (ruleType) {
            case WhiteListType.MAC:
                return 'MAC';
            case WhiteListType.Freq:
                return '频段';
            default:
                return '';
        }
    };

    const renderStatusName = (status: number) => {
        switch (status) {
            case 0:
                return <Tag color="green">生效中</Tag>;
            case 1:
                return <Tag color="orange">未生效</Tag>;
            default:
                return '';
        }
    };

    return <li>
        <div>
            <span className="wl-type">{renderTypeName(data.ruleType)}</span>
            <span>{data.ruleName}</span>
        </div>
        <div>
            <span>{renderStatusName(data.status)}</span>
        </div>
    </li>;
};

/**
 * 白名单Top10
 */
const WhiteListTop: FC<{}> = () => {

    const {
        whiteListTop,
        queryWhiteListTop
    } = useModel(state => ({
        whiteListTop: state.whiteListTop,
        queryWhiteListTop: state.queryWhiteListTop
    }));

    useEffect(() => {
        queryWhiteListTop();
    }, []);

    const renderItem = () =>
        whiteListTop.map(item =>
            <WhiteListItem data={item} key={`WLI_${item.id}`} />);

    return <DisplayPanel>
        <div className="caption">白名单Top10</div>
        <div className="content">
            <ScrollWhiteList>
                <ul>
                    {renderItem()}
                </ul>
            </ScrollWhiteList>
        </div>
    </DisplayPanel>;
};

export { WhiteListTop };