import { Point } from "@/schema/point";
import { helper } from '@/utility/helper';

const bands = helper.readBand();

/**
 * 渲染详情
 * @param point 定位点
 */
export const renderTemp = (points: Point[]) => {

    if (points === undefined || points === null || points.length === 0) {
        return '';
    }

    const pointsHtml = points.map(p => {
        let type = '', content = '';
        switch (p.protocolType) {
            case 8:
                type = p.type === 'sta' ? '终端' : 'WiFi2.4G';
                content = p.content ?? '';
                break;
            case 9:
                type = p.type === 'sta' ? '终端' : 'WiFi5.8G';
                content = p.content ?? '';
                break;
            case 14:
                type = '蓝牙';
                content = p.content ?? '';
                break;
            default:
                if (p.protocolType >= 101 && p.protocolType <= 113) {
                    type = '制式信号';
                    const has = bands.find(i => i.code === p.protocolType);
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
    });
    return pointsHtml.join('<hr class="map-tip-divider" />');
};