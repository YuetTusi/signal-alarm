import { throttle } from 'lodash';
import * as echarts from 'echarts/core';
import { FC, useEffect } from 'react';
import { useResize, useUnmount } from '@/hook';
import { ChartBox } from './styled/box';
import { RateProp } from './prop';

let realChart: echarts.ECharts | null = null;
let compareChart: echarts.ECharts | null = null;

let realOption: any = {
    xAxis: {
        show: false,
        type: 'category',
        data: []
    },
    yAxis: {
        show: false,
        type: 'value'
    },
    series: [
        {
            type: 'bar',
            data: []
        }
    ],
    tooltip: {
        show: false
    }
};
let compareOption: any = {
    xAxis: {
        show: false,
        type: 'category',
        data: []
    },
    yAxis: {
        show: false,
        type: 'value'
    },
    series: [
        {
            type: 'bar',
            data: []
        }
    ],
    tooltip: {
        show: false
    }
};

// const generateData = () => {
//     let baseValue = Math.random() * 1000;
//     const categoryData = [];
//     const valueData = [];

//     for (let i = 0; i < 1499; i++) {
//         categoryData.push(
//             i + 1
//         );
//         let value = Math.floor(Math.random() * 100) + 1;
//         let itemStyle;
//         if (value > 90) {
//             itemStyle = { color: '#FF0000' };
//         } else if (value > 60) {
//             itemStyle = { color: '#FFA500' };
//         } else {
//             itemStyle = { color: '#008000' };
//         }
//         value = 100;
//         let jsonObj = { value, itemStyle };
//         valueData.push(jsonObj);
//     }
//     return {
//         categoryData: categoryData,
//         valueData: valueData
//     };
// }

const chartResize = (chart: echarts.ECharts | null, containerId: string) => {
    if (chart !== null) {
        const outer = document.querySelector(`#${containerId}`);
        chart.resize({
            width: outer?.clientWidth ?? document.body.clientWidth - 400
        });
    }
};

/**
 * 频率图表
 */
const Rate: FC<RateProp> = ({ realData, compareData }) => {

    useEffect(() => {
        if (realChart === null) {
            realChart = echarts.init(document.querySelector('#realRate')!, 'dark');
            chartResize(realChart, 'realOuterBox');
        }
        if (compareChart === null) {
            compareChart = echarts.init(document.querySelector('#compareRate')!, 'dark');
            chartResize(compareChart, 'realOuterBox');
        }
    }, []);

    useUnmount(() => {
        if (realChart) {
            realChart.clear();
            realChart = null;
        }
        if (compareChart) {
            compareChart.clear();
            compareChart = null;
        }
    });

    useEffect(() => {
        if (realChart === null) {
            return;
        }
        realOption.xAxis.data = new Array(1499).fill(0).map((item, i) => item + i);
        realOption.series[0].data = realData.map(value => {
            let itemStyle: Record<string, any> = {};
            if (value >= 10 && value <= 20) {
                itemStyle = { color: '#FFA500' };
            } else if (value > 20) {
                itemStyle = { color: '#FF0000' };
            }
            // if (value < -80) {
            //     itemStyle = { color: '#008000' };
            // } else if (value >= -80 && value <= -70) {
            //     itemStyle = { color: '#FFA500' };
            // } else {
            //     itemStyle = { color: '#FF0000' };
            // }
            value = 100;
            return { value, itemStyle };
        });
        realChart.setOption(realOption);
    }, [realData]);

    useEffect(() => {
        if (compareChart === null) {
            return;
        }

        // if (compareData.length === 0) {
        //     for (let i = 0; i < 1499; i++) {
        //         (compareData as any[]).push(null);
        //     }
        // }

        compareOption.xAxis.data = new Array(1499).fill(0).map((item, i) => item + i);
        compareOption.series[0].data = compareData.map(value => {
            let itemStyle: Record<string, any> = {};
            if (value >= 10 && value <= 20) {
                itemStyle = { color: '#FFA500' };
            } else {
                itemStyle = { color: '#FF0000' };
            }
            (value as any) = null;
            return { value, itemStyle };
        });
        // const { valueData, categoryData } = generateData();
        // compareOption.xAxis = categoryData;
        // compareOption.series = valueData
        compareChart.setOption(compareOption);
    }, [compareData]);

    useResize(throttle((_: Event) => {
        chartResize(realChart, 'realOuterBox');
        chartResize(compareChart, 'realOuterBox');
    }, 500, { trailing: true, leading: false }));

    return <div>
        <ChartBox
            height={50}
            id="realRate">
        </ChartBox>
        <ChartBox
            height={50}
            id="compareRate">
        </ChartBox>
    </div>;
};

export { Rate };