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
import { ChartBox } from './styled/box';
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

    return helper.isNullOrUndefined(data) || data.length === 0
        ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        : <ChartBox
            width={320}
            height={200}
            ref={chartDom} />;
};

Rose.defaultProps = {
    serieName: '',
    data: []
}

export { Rose };