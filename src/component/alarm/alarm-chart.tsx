import throttle from 'lodash/throttle';
import * as echarts from 'echarts/core';
import { FC, useEffect, useRef } from 'react';
import { useModel } from '@/model';
import { useResize } from '@/hook';
import { AlarmChartBox } from './styled/style';

var $chart: echarts.ECharts;
var option = {
    grid: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '25%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: (params: any[]) => {
            const [first] = params;
            return `<div class="bar-tooltip">
                <div class="tt-caption">
                ${first.marker}
                    ${first.name}
                </div>
                <div class="tt-row">
                    <span>
                        <label>强度：</label>
                    </span>
                    <b style="text-align:right;">${first.data.value ?? '-'}</b>
                </div>
                <div class="tt-row">
                    <label>告警时间：</label>
                    <b>${first.data.captureTime ?? '-'}</b>
                </div>
            </div>`;
        }
    },
    xAxis: {
        type: 'category',
        interval: 10,
        axisLabel: {
            interval: 0,
            // rotate: 45,
            formatter: (value: string) => {
                return value.split(',').join('\n').split('(').join('\n(');
                // return value;
            }
        },
        data: []
    },
    yAxis: {
        type: 'value',
    },
    series: [{
        name: '强度',
        type: 'bar',
        data: [],
        itemStyle: {
            color: (params: any) => {
                if (params.value < 50) {
                    return '#4cd137';
                } else if (params.value >= 50 && params.value < 70) {
                    return '#fbc531';
                } else {
                    return '#eb2f06';
                }
            }
        }
    }],
    dataZoom: [
        {
            show: false,
            type: "slider",
            showDetail: false
        }
    ]
};

const chartResize = (chart: echarts.ECharts | null, containerId: string) => {
    if (chart !== null) {
        const outer = document.querySelector(`#${containerId}`);
        chart.resize({
            width: outer?.clientWidth ?? document.body.clientWidth - 2,
            height: outer?.clientHeight ?? document.body.clientHeight - 149
        });
    }
};

/**
 * 预警柱状图
 * 数据由SSE推送，以band分类显示
 */
const AlarmChart: FC<{}> = () => {

    const boxRef = useRef<HTMLDivElement>(null);

    const {
        alarmBarData
    } = useModel(state => ({
        alarmBarData: state.alarmBarData
    }));

    useResize(throttle((_: Event) => {
        chartResize($chart, 'alarmChart');
    }, 500, { trailing: true, leading: false }));

    useEffect(() => {

        if (boxRef.current) {
            // boxRef.current.style.width = `${document.querySelector('#alarmChartCaption')!.clientWidth}px`;
            $chart = echarts.init(boxRef.current, 'dark');
            $chart.setOption(option);
        }
    }, []);

    useEffect(() => {
        if ($chart) {
            $chart.setOption({
                xAxis: { data: Object.keys(alarmBarData) },
                series: [{
                    data: Object.values(alarmBarData).map(i => ({
                        ...i,
                        value: i.rssi
                    })),
                }]
            });
            //数据更新后，重新设置宽度
            $chart.resize({
                width: document.querySelector('#alarmChartCaption')?.clientWidth,
            });
        }
    }, [alarmBarData]);

    return <AlarmChartBox
        ref={boxRef}
        id="alarmChart" />;
};

export { AlarmChart };