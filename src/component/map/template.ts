import { Point } from "@/schema/point";
import { helper } from '@/utility/helper';

const bands = helper.readBand();

/**
 * 渲染详情
 * @param point 定位点
 */
export const renderTemp = (point: Point) => {

    if (point === undefined || point === null) {
        return '';
    }

    let type = '', content = '';
    switch (point.protocolType) {
        case 8:
            type = 'WiFi2.4G';
            content = point.content ?? '';
            break;
        case 9:
            type = 'WiFi5.8G';
            content = point.content ?? '';
            break;
        case 14:
            type = '蓝牙';
            content = point.content ?? '';
            break;
        default:
            if (point.protocolType >= 101 && point.protocolType <= 113) {
                type = '制式信号';
                const has = bands.find(i => i.code === point.protocolType);
                content = has?.name ?? '';
            } else {
                type = '-';
                content = '-';
            }
            break;
    }

    return `<div class="map-tip-table">
        <table>
            <tbody>
            <tr>
                <td>类型：</td>
                <td>${type}</td>
            </tr>
            <tr>
                <td>内容：</td>
                <td>${content}</td>
            </tr>
            </tbody>
        </table>
    </div>`;
};