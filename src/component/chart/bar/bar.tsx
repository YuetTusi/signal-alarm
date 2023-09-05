
import { FC, useEffect, useRef } from 'react';
import { Empty } from 'antd';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
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
import { BarProp } from './prop';

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LegendComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    ToolboxComponent
]);

var myChart: echarts.ECharts | null = null;


/**
 * 柱状图
 */
const Bar: FC<BarProp> = ({ xData, yData, serieName }) => {

    const chartDom = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (chartDom.current) {
            myChart = echarts.init(chartDom.current, 'dark');
            myChart.setOption({
                title: {
                    show: false
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    position: ([x, y]: number[]) => {
                        const xPoint = x < 150 ? x : x - 160;
                        const yPoint = y < 150 ? y : y - 60;
                        return [xPoint, yPoint];
                    }
                },
                toolbox: {
                    show: false
                },
                xAxis: {
                    type: 'value',
                    axisLabel: {
                        inside: true,
                        formatter: function (value: string) {
                            return value + '';
                        }
                    },
                    offset: 32,
                    splitNumber: 2
                },
                yAxis: {
                    type: 'category',
                    data: xData,
                    axisLabel: {
                        show: false
                    }
                },
                series: [
                    {
                        name: serieName,
                        type: 'bar',
                        data: yData,
                        smooth: true,
                        label: {
                            show: true,
                            fontSize: 11,
                            position: [5, '0%'],
                            formatter({ name }: Record<string, any>) {
                                return name;
                            }
                        }
                        // barWidth: 25
                    }
                ],
                dataZoom: [
                    {
                        show: false,
                        type: "slider",
                        showDetail: false
                    }
                ]
            });
        }
    }, [xData, yData, serieName]);

    return helper.isNullOrUndefined(yData) || yData.length === 0
        ? <EmptyBox>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </EmptyBox>
        : <ChartBox
            width={320}
            height={260}
            ref={chartDom} />;
};

Bar.defaultProps = {
    serieName: '',
    xData: [],
    yData: []
}

export { Bar };