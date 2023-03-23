
import { FC, useEffect } from 'react';
import useModel from '@/model';
import { Loop } from '@/component/chart';
import { getProtocolLabel } from '@/schema/protocol';
import { DisplayPanel } from '../panel';

/**
 * 专项检查分类图表
 */
const SpecialTypeChart: FC<{}> = () => {

    const {
        specialTypeStatisData,
        querySpecialTypeStatisData
    } = useModel(state => ({
        specialTypeStatisData: state.specialTypeStatisData,
        querySpecialTypeStatisData: state.querySpecialTypeStatisData
    }));

    useEffect(() => {
        querySpecialTypeStatisData();
    }, []);

    const convertData = () =>
        specialTypeStatisData.map(item => ({
            name: getProtocolLabel(item.protocolType),
            value: Number.parseInt(item.num)
        }));

    return <DisplayPanel>
        <div className="caption">专项检查分类统计</div>
        <div className="content">
            <Loop serieName="专项检查分类统计" data={convertData()} />
        </div>
    </DisplayPanel>;
};

export { SpecialTypeChart };