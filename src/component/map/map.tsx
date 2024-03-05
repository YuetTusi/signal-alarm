import markerIconPng from '@/assets/image/marker-icon.png';
import L from 'leaflet';
import { FC, useEffect, useRef } from 'react';
import { getRealitySize, calcBounds } from './util';
import { MAP_BACKGROUND_BOUNDS, helper } from '@/utility/helper';
import { MapBox } from './styled/box';
import { MapProp } from './prop';

let topLeft = { x: 0, y: 0 };
let rightBottom = { x: 0, y: 0 };

const defaultIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconAnchor: [12, 44]
});

/**
 * 地图
 */
const Map: FC<MapProp> = ({
    x, y, width, height, background, onAddPoint
}) => {

    const prevMark = useRef<L.Marker | null>(null);

    useEffect(() => {

        if (helper.isNullOrUndefined(background)) {
            return;
        }

        const bg: HTMLElement = document.querySelector('#map')!;
        const bounds = calcBounds(width, height);
        let map = L.map(bg, {
            zoomControl: false,
            doubleClickZoom: false,
            attributionControl: false,
            maxBounds: bounds
        });
        L.imageOverlay(background, bounds).addTo(map);
        map.fitBounds(bounds);
        map.setMinZoom(18);
        map.setMaxZoom(22);

        if (x !== 0 && y !== 0) {
            const mark = L.marker([x, y], { icon: defaultIcon }).addTo(map!);
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

                const mark = L.marker(e.latlng, { icon: defaultIcon }).addTo(map!);

                if (prevMark.current !== null) {
                    map?.removeLayer(prevMark.current);
                }
                prevMark.current = mark;
            }
            onAddPoint(e.latlng.lat, e.latlng.lng);
        });
    }, [x, y, width, height, background, onAddPoint]);

    return <MapBox id="map">

    </MapBox>;
};

export { Map };