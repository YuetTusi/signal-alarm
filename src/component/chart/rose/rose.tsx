import { FC, useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
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
import { RoseProp } from './prop';

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
 * 玫瑰图
 */
const Rose: FC<RoseProp> = ({ data, serieName }) => {

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
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: serieName,
                        type: 'pie',
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 2
                        },
                        data
                    }
                ]
            });
        }
    }, [data, serieName]);

    return <div
        ref={chartDom}
        style={{ width: '400px', height: '380px' }} />;
};

Rose.defaultProps = {
    serieName: '',
    data: []
}

export { Rose };