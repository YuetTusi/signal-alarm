
import { FC, useEffect, useRef } from 'react';
import { Empty } from 'antd';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    ToolboxComponent,
    DataZoomComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { helper } from '@/utility/helper';
import { ChartBox, EmptyBox } from './styled/box';
import { LineProp } from './prop';

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LineChart,
    LegendComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    ToolboxComponent,
    DataZoomComponent
]);

var myChart: echarts.ECharts | null = null;


/**
 * 曲线图
 */
const Line: FC<LineProp> = ({ data, days, serieName }) => {

    const chartDom = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (chartDom.current) {
            myChart = echarts.init(chartDom.current, 'dark');
            myChart.setOption({
                title: {
                    show: false
                },
                tooltip: {
                    // trigger: 'item',
                    // position: 'right',
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    position: ([x, y]: number[]) => {
                        return [x + 40, y - 20];
                    }
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: { show: true },
                        saveAsImage: { show: false }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: days
                },
                yAxis: {
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
                series: [
                    {
                        name: serieName,
                        type: 'line',
                        data,
                        smooth: true
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
    }, [data, serieName]);

    return helper.isNullOrUndefined(data) || data.length === 0
        ? <EmptyBox>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </EmptyBox>
        : <ChartBox
            width={320}
            height={190}
            ref={chartDom} />;
};

Line.defaultProps = {
    serieName: '',
    data: []
}

export { Line };