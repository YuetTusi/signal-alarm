## 实时频谱模块说明

@component/chart/rate 中是频谱组件

组件的显示逻辑是

频谱柱状图的 X 轴是固定的，从 0~7499。循环每个柱的下标，如果与 freqComResList 中的 freq 相等，则再比较 currentOffsetSignal 字段来切换颜色。

当 currentOffsetSignal 在 10~20 之间为黄色，大于 20 为红色，其余为绿色。
