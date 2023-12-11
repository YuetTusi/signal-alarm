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
import { FC, useEffect, useRef } from 'react';
import { data } from './mock';
import { AlarmChartBox } from './styled/style';


var option = {
    grid: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '33%'
    },
    xAxis: {
        type: 'category',
        axisLabel: {
            interval: 0,
            // rotate: 45,
            formatter: (value: string) => {
                return value.split(',').join('\n').split('(').join('\n(');
                // return value;
            }
        },
        data: data.map(i => i.name)
    },
    yAxis: {
        type: 'value',
    },
    series: [{
        name: 'start',
        type: 'bar',
        data: data.map(i => i.start)
    }, {
        name: 'end',
        type: 'bar',
        data: data.map(i => i.stop)
    }]
};



/**
 * 预警柱状图
 * 数据由SSE推送，以band分类显示
 */
const AlarmChart: FC<{}> = () => {

    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (boxRef.current) {
            var chart = echarts.init(boxRef.current, 'dark');
            chart.setOption(option);
        }

    }, []);


    useEffect(() => {


    }, []);

    return <AlarmChartBox ref={boxRef}>

    </AlarmChartBox>;
};

export { AlarmChart };