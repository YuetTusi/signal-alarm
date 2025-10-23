import throttle from 'lodash/throttle';
import { FC, useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
    VisualMapComponent,
    CalendarComponent,
    GridComponent,
    TimelineComponent,
    MarkLineComponent,
    LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { useResize } from '@/hook';
import { helper } from '@/utility/helper';
import { ChartBox } from './styled/box';
import { SpectrumProp, SpectrumType } from './prop';

// 注册必须的组件
echarts.use([
    GridComponent,
    VisualMapComponent,
    CalendarComponent,
    TimelineComponent,
    LegendComponent,
    MarkLineComponent,
    LineChart,
    CanvasRenderer
]);

var myChart: echarts.ECharts | null = null;

const chartResize = (chart: echarts.ECharts | null, containerId: string) => {
    if (chart !== null) {
        const outer = document.querySelector(`#${containerId}`);
        chart.resize({
            width: outer?.clientWidth ?? document.body.clientWidth - 400
        });
    }
};

/**
 * 返回最大值及索引
 * @param data 数据
 */
const getMaxValue = (data: number[]) => {
    if (helper.isNullOrUndefined(data) || data.length === 0) {
        return null;
    }
    return data.reduce<{ max?: number, index: number }>(
        (acc, current, index) => {
            if (acc.max === undefined || current > acc.max) {
                return {
                    max: current,
                    index
                };
            } else {
                return acc
            }
        },
        { max: undefined, index: -1 }
    );
};

/**
 * 实时频谱线图
 */
const Spectrum: FC<SpectrumProp> = ({
    domId, type, realData, compareData, arfcn
}) => {

    const chartDom = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartDom.current) {
            chartResize(myChart, domId);
        }
    }, [chartDom.current]);

    useResize(throttle((_: Event) => {
        chartResize(myChart, domId);
    }, 500, { trailing: true, leading: false }));

    /**
     * 图例配置
     */
    // const getLegend = () => {
    //     const legends = [{ name: type === SpectrumType.Live ? '实时频谱' : '历史频谱' }];
    //     if (compareData && compareData.length > 0) {
    //         legends.push({ name: '背景频谱' });
    //     }
    //     console.log(legends);
    //     return legends;
    // };

    useEffect(() => {
        if (chartDom.current) {
            myChart = echarts.init(chartDom.current, 'dark');
            myChart.setOption({
                title: {
                    show: false
                },
                legend: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 60,
                    data: [{
                        name: type === SpectrumType.Live ? '实时频谱' : '历史频谱'
                    }, {
                        name: '背景频谱'
                    }]
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
                series: [
                    {
                        data: realData,
                        name: '',
                        type: 'line',
                        smooth: false,
                        itemStyle: {
                            normal: {
                                color: '#32ff7e',
                                lineStyle: {
                                    width: 1//设置线条粗细
                                }
                            }
                        },
                        markLine: {
                            silent: true,
                            animation: false,
                            symbol: 'none',
                            data: [{
                                name: '',
                                xAxis: '',
                                label: {
                                    show: false
                                }
                            }]
                        }
                    }
                ],
                dataZoom: [
                    {
                        show: true,
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

            const realMark = getMaxValue(realData);
            const compareMark = getMaxValue(compareData);

            let seriseData: any[] = [{
                data: realData,
                name: type === SpectrumType.Live ? '实时频谱' : '历史频谱',
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
            if (compareData && compareData.length > 0) {

                seriseData.push({
                    data: compareData,
                    name: `背景频谱`,
                    type: 'line',
                    smooth: false,
                    itemStyle: {
                        normal: {
                            color: '#ff9f1a',
                            lineStyle: {
                                width: 1//设置线条粗细
                            }
                        }
                    },
                    markLine: {
                        silent: true,
                        animation: false,
                        symbol: 'none',
                        data: [{
                            name: '最大值',
                            xAxis: compareData.every(i => i.toString() === '-') ? '' : compareMark?.index,
                            label: {
                                show: true,
                                fontSize: 14,
                                color: '#ff9f1a',
                                distance: [0, 20],
                                formatter() {
                                    return `最大强度：${compareMark?.max}dBm（${Math.trunc((compareMark?.index ?? 0) * 0.8) + 1}MHz）`;
                                }
                            },
                            lineStyle: {
                                color: '#ff9f1a',
                                width: 2,
                                type: 'dashed'
                            }
                        }]
                    }
                });
            }

            const prev = myChart.getOption();
            if (realMark !== null) {
                seriseData[0].markLine = {
                    silent: true,
                    animation: false,
                    symbol: 'none',
                    data: [{
                        name: '最大值',
                        xAxis: realData.every(i => i.toString() === '-') ? '' : realMark.index,
                        label: {
                            show: true,
                            fontSize: 14,
                            color: '#32ff7e',
                            formatter(a: any, b: any) {
                                return `最大强度：${Math.max(...realData)}dBm（${Math.trunc(realMark.index * 0.8) + 1}MHz）`
                            }
                        },
                        lineStyle: {
                            color: '#32ff7e',
                            width: 2,
                            type: 'dashed'
                        }
                    }]
                }
            }
            const option: echarts.EChartsCoreOption = {
                ...prev,
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    y: 60,
                    data: [{
                        name: type === SpectrumType.Live ? '实时频谱' : '历史频谱'
                    }, {
                        name: '背景频谱'
                    }]
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter(params: any[]) {
                        console.log(params);
                        const tips = params.map(item => `<div>
                            <div>
                                ${item.marker}
                                <b>${item.seriesName}</b>
                                <span style="padding-left:1rem">${item.value}dBm</span>
                            </div>
                        </div>`);
                        return `<div>
                            <div style="padding-bottom:1rem">${params[0].name} MHz</div>
                            ${tips.join('')}
                        </div>`;
                    }
                },
                xAxis: { data: arfcn },
                series: seriseData
            };

            myChart.setOption(option, true);
        }
    }, [realData, compareData, arfcn]);

    return <>
        <ChartBox
            width={800}
            height={460}
            id="pastBox"
            ref={chartDom} />
    </>;
};

export { Spectrum };