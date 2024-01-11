import throttle from 'lodash/throttle';
import { FC, useEffect, useRef } from 'react';
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
import { useResize, useUnmount } from '@/hook';
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

var myChart: echarts.ECharts | null = null;

const chartResize = (chart: echarts.ECharts | null, containerId: string) => {
    if (chart !== null) {
        const outer = document.querySelector(`#${containerId}`);
        chart.resize({
            width: outer?.clientWidth ?? document.body.clientWidth - 400
        });
    }
}

/**
 * 实时频谱线图
 */
const Spectrum: FC<SpectrumProp> = ({
    domId, realData, compareData, arfcn, serieName, captureTime
}) => {

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
                legend: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 60,
                    data: [
                        { name: '实时频谱' },
                        { name: '比对频谱' }
                    ],
                    // right: '50%',
                    // trigger: 'item',
                    // pageIconColor: '#256bec',
                    // pageIconInactiveColor: '#b8b8b8',
                    // pageIconSize: 10,
                    // pageTextStyle: { color: '#ffffffd9' }
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: { show: true },
                        saveAsImage: { show: false }
                    }
                },
                grid: {
                    bottom: 80
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        inside: false,
                        interval(index: number, value: any) {
                            if (index % 599 === 0) {
                                return value;
                            } else {
                                return '';
                            }
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    interval: 10,
                    axisLabel: {
                        inside: false,
                        formatter(value: string) {
                            return value + '';
                        }
                    },
                    offset: 32,
                    splitNumber: 2
                },
                series: [],
                dataZoom: [
                    {
                        show: false,
                        type: "slider",
                        showDetail: false,
                        bottom: 20
                    }
                ]
            });
        }
    }, []);

    useEffect(() => {

        if (myChart !== null) {

            const seriseData: any[] = [{
                data: realData,
                name: `实时频谱`,
                type: 'line',
                smooth: false,
                itemStyle: {
                    normal: {
                        color: '#32ff7e',
                        lineStyle: {
                            width: 1//设置线条粗细
                        }
                    }
                }
            }];
            if (compareData !== undefined) {
                seriseData.push({
                    data: compareData,
                    name: `比对频谱`,
                    type: 'line',
                    smooth: false,
                    itemStyle: {
                        normal: {
                            color: '#ff9f1a',
                            lineStyle: {
                                width: 1//设置线条粗细
                            }
                        }
                    }
                });
            }

            myChart.setOption({
                xAxis: { data: arfcn },
                series: seriseData
            });
        }
    }, [realData, compareData, arfcn]);

    return <>
        <ChartBox
            width={800}
            height={550}
            id="spectrumBox"
            ref={chartDom} />
    </>;
};

Spectrum.defaultProps = {
    domId: '',
    serieName: '',
    realData: [],
    compareData: undefined
}

export { Spectrum };