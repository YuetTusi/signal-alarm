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
import { ChartBox, EmptyBox } from './styled/box';
import { LoopProp } from './prop';

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
                    position: 'right'
                    // formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        saveAsImage: { show: false }
                    }
                },
                legend: {
                    show: true,
                    type: 'scroll',
                    orient: 'vertical',
                    right: 0,
                    trigger: 'item',
                    pageIconColor: '#256bec',
                    pageIconInactiveColor: '#b8b8b8',
                    pageIconSize: 10,
                    pageTextStyle: { color: '#ffffffd9' },
                    textStyle: {
                        fontSize: 16
                    },
                    formatter: (name: string) => {
                        const item = data.find((i) => i.name === name);
                        if (item) {
                            return `${name}(${item.value})`;
                        } else {
                            return name;
                        }
                    }
                },
                series: [
                    {
                        name: serieName,
                        label: { show: false },
                        center: [100, '50%'],
                        type: 'pie',
                        radius: ['40%', '70%'],
                        itemStyle: {
                            borderRadius: 0
                        },
                        data,
                    }
                ]
            });
        }
    }, [data, serieName]);

    return helper.isNullOrUndefined(data) || data.length === 0
        ? <EmptyBox>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </EmptyBox>
        : <ChartBox
            width={420}
            height={220}
            ref={chartDom} />;
};

Loop.defaultProps = {
    serieName: '',
    data: []
}

export { Loop };