import { Point } from "@/schema/point";
import { helper } from '@/utility/helper';

const bands = helper.readBand();

export const renderTemp = (point: Point) => {

    if (point === undefined || point === null) {
        return '';
    }

    let type = '';
    switch (point.protocolType) {
        case 8:
            type = 'WiFi2.4G';
            break;
        case 9:
            type = 'WiFi5.8G';
            break;
        case 14:
            type = '蓝牙';
            break;
        default:
            if (point.protocolType >= 101 && point.protocolType <= 113) {
                const has = bands.find(i => i.code === point.protocolType);
                type = has?.name ?? '';
            } else {
                type = '';
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
                <td>${point.content ?? ''}</td>
            </tr>
            </tbody>
        </table>
    </div>`;
};