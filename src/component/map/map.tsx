import L, { LatLngBoundsLiteral, LeafletEvent } from 'leaflet';
import { FC, useEffect, useRef } from 'react';
import { MapProp } from './prop';
import { MapBox } from './styled/box';
import { helper } from '@/utility/helper';

let map: L.Map | null = null;
let topLeft = { x: 0, y: 0 };
let rightBottom = { x: 0, y: 0 };

/**
 * 地图
 */
const Map: FC<MapProp> = ({ x, y, background, onAddPoint }) => {

    const prevMark = useRef<L.Marker | null>(null);

    useEffect(() => {

        if (helper.isNullOrUndefined(background)) {
            return;
        }

        // if (map === null) {
        const bg: HTMLElement = document.querySelector('#map')!;
        var imageBounds: LatLngBoundsLiteral = [[40.712216, -74.22655], [40.773941, -74.12544]];
        // var imageBounds: LatLngBoundsLiteral = [[0, -40.22655], [0, -40.12544]];
        map = L.map(bg, {
            zoomControl: false,
            doubleClickZoom: false,
            maxBounds: imageBounds
        });
        L.imageOverlay(background, imageBounds).addTo(map);
        map.fitBounds(imageBounds);
        map.setMinZoom(10);
        map.setMaxZoom(15);

        if (x !== 0 && y !== 0) {
            const mark = L.marker(map.containerPointToLatLng([x, y])).addTo(map!);
            if (prevMark.current !== null) {
                map?.removeLayer(prevMark.current);
            }
            prevMark.current = mark;
        } else {
            onAddPoint(0, 0);
        }

        map.on('click', function (e) {

            const topRight = map?.latLngToContainerPoint(e.target.options.maxBounds._northEast);
            const leftBottom = map?.latLngToContainerPoint(e.target.options.maxBounds._southWest);

            topLeft.x = leftBottom?.x ?? 0;
            topLeft.y = topRight?.y ?? 0;
            rightBottom.x = topRight?.x ?? 0;
            rightBottom.y = leftBottom?.y ?? 0;

            const point = map?.latLngToContainerPoint(e.latlng)!;//转为坐标点

            if (point.x > topLeft.x && point.x < rightBottom.x && point.y > topLeft.y && point.y < rightBottom.y) {

                const mark = L.marker(e.latlng).addTo(map!);

                if (prevMark.current !== null) {
                    map?.removeLayer(prevMark.current);
                }
                prevMark.current = mark;
            }
            onAddPoint(point.x, point.y);
        });
        // }
    }, [x, y, background, onAddPoint]);

    return <MapBox id="map">

    </MapBox>;
};

export { Map };