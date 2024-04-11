import { throttle } from 'lodash';
import * as echarts from 'echarts/core';
import { FC, useEffect, useRef } from 'react';
import { Table } from 'antd';
import { useResize, useUnmount } from '@/hook';
import { helper } from '@/utility/helper';
import { AppMode } from '@/schema/conf';
import { FreqCompare } from '@/schema/freq-compare';
import { getCompareColumns } from './column';
import { ChartBox, PanelBox, TableBox } from './styled/box';
import { RateProp } from './prop';

const { mode } = helper.readConf();
const SIZE = 7499;
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
    },
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
            width: outer?.clientWidth ?? document.body.clientWidth - 400
        });
    }
};

/**
 * 频率图表
 */
const Rate: FC<RateProp> = ({ realData, compareData, displayData, outerDomId }) => {

    const tableRef = useRef<any>(null);

    useEffect(() => {
        if (realChart === null) {
            realChart = echarts.init(document.querySelector('#realRate') as HTMLElement, 'dark');
            chartResize(realChart, outerDomId);
        }
        if (compareChart === null) {
            compareChart = echarts.init(document.querySelector('#compareRate') as HTMLElement, 'dark');
            chartResize(compareChart, outerDomId);
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
        realOption.xAxis.data = new Array(SIZE).fill(0).map((item, i) => item + i);
        realOption.series[0].data = realData.map((_, index) => {

            if (compareData[index]) {
                return { value: 100, itemStyle: compareData[index].itemStyle };
            } else {
                return { value: 100, itemStyle: { color: '#008000' } };
            }
        });
        realChart.setOption(realOption);
    }, [realData, compareData]);

    useResize(throttle((_: Event) => {
        chartResize(realChart, outerDomId);
        chartResize(compareChart, outerDomId);
    }, 500, { trailing: true, leading: false }));

    const heightByMode = (mode: AppMode) => {
        if (mode === AppMode.FullScreen) {
            return 290;
        } else {
            return helper.PLATFORM === 'linux' ? 160 : 260;
        }
    }

    return <>
        <PanelBox className={realData.length === 0 ? 'fn-hidden' : undefined}>
            <ChartBox
                height={50}
                id="realRate">
            </ChartBox>
            <ChartBox
                height={50}
                id="compareRate">
            </ChartBox>
            <TableBox ref={tableRef}>
                <Table<FreqCompare>
                    columns={getCompareColumns(() => { })}
                    dataSource={displayData}
                    rowKey={() => helper.nextId(8)}
                    pagination={false}
                    size="small"
                    scroll={{ y: heightByMode(mode) }}
                />
            </TableBox>
        </PanelBox>
    </>;
};

export { Rate };