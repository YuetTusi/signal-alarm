import { FC, useEffect, useRef } from 'react';
import { Empty } from 'antd';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    ToolboxComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { helper } from '@/utility/helper';
import { LoopProp } from './prop';
import { ChartBox } from './styled/box';

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    PieChart,
    LegendComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    ToolboxComponent
]);

var myChart: echarts.ECharts | null = null;


/**
 * 环形图
 */
const Loop: FC<LoopProp> = ({ data, serieName }) => {

    const chartDom = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (chartDom.current) {
            myChart = echarts.init(chartDom.current, 'dark');
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    // formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        saveAsImage: { show: false }
                    }
                },
                series: [
                    {
                        name: serieName,
                        type: 'pie',
                        radius: ['40%', '70%'],
                        itemStyle: {
                            borderRadius: 0
                        },
                        data
                    }
                ]
            });
        }
    }, [data, serieName]);

    return helper.isNullOrUndefined(data) || data.length === 0
        ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        : <ChartBox
            width={320}
            height={200}
            ref={chartDom} />;
};

Loop.defaultProps = {
    serieName: '',
    data: []
}

export { Loop };