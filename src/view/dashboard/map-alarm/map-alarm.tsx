import fileJpg from '@/assets/image/file.jpg';
import L, { Map } from 'leaflet';
import { FC, useEffect, useRef } from 'react';
import { MAP_BACKGROUND_BOUNDS } from '@/utility/helper';

const MapAlarm: FC<{}> = () => {

    const mapRef = useRef<Map | null>(null);

    useEffect(() => {
        if (mapRef.current === null) {
            mapRef.current = L.map('map');
            var imageBounds: any = MAP_BACKGROUND_BOUNDS;
            L.imageOverlay(fileJpg, imageBounds).addTo(mapRef.current);
            mapRef.current.fitBounds(MAP_BACKGROUND_BOUNDS)
            L.marker([40.752216, -74.1636]).addTo(mapRef.current);
        }
    }, []);

    return <div style={{
        height: '100%',
        width: '100%'
    }} id="map">
    </div>
};

export { MapAlarm };