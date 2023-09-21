import throttle from 'lodash/throttle';
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
import { useResize } from '@/hook';
import { ChartBox, EmptyBox } from './styled/box';
import { SpectrumProp } from './prop';


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

var accData: number[] = [];
var accDays: string[] = [];
var myChart: echarts.ECharts | null = null;

const chartResize = (chart: echarts.ECharts | null, containerId: string) => {
    if (chart !== null) {
        const outer = document.querySelector(`#${containerId}`);
        chart.resize({
            width: outer?.clientWidth ?? document.body.clientWidth - 2,
            height: outer?.clientHeight ?? document.body.clientHeight - 149
        });
    }
}

/**
 * 实时频谱线图
 */
const Spectrum: FC<SpectrumProp> = ({ domId, data, arfcn, serieName, captureTime }) => {

    const chartDom = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartDom.current) {
            chartResize(myChart, domId);
        }
    }, [chartDom.current]);

    useResize(throttle((event: Event) => {
        chartResize(myChart, domId);
    }, 500, { trailing: true, leading: false }));

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
                    data: accData,
                    axisLabel: {
                        interval(index: number, value: any) {
                            switch (index) {
                                case 0:
                                    return value;
                                case 3749:
                                    return value;
                                case 7498:
                                    return value;
                                default:
                                    return '';
                            }
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        inside: true,
                        formatter(value: string) {
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
                        data: accDays,
                        smooth: false
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
    }, []);

    useEffect(() => {
        if (myChart !== null) {

            myChart.setOption({
                xAxis: { data: arfcn },
                series: [{ data: data, name: serieName }]
            })
        }
    }, [data, arfcn]);

    // return data.length === 0
    //     ? <EmptyBox>
    //         <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    //     </EmptyBox>
    //     : <ChartBox
    //         id="spectrumBox"
    //         ref={chartDom} />;

    return <>
        <EmptyBox
            style={{ display: data.length === 0 ? 'flex' : 'none' }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </EmptyBox>
        <ChartBox
            id="spectrumBox"
            ref={chartDom}
            style={{ display: data.length === 0 ? 'none' : 'block' }} />
    </>;
};

Spectrum.defaultProps = {
    domId: '',
    serieName: '',
    data: []
}

export { Spectrum };