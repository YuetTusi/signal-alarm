import L, { Map } from 'leaflet';
import { FC, useEffect, useRef } from 'react';
import fileJpg from '@/assets/image/file.jpg';

const MapAlarm: FC<{}> = () => {

    const mapRef = useRef<Map | null>(null);

    useEffect(() => {
        if (mapRef.current === null) {
            mapRef.current = L.map('map');
            // var imageUrl = './file.jpg';
            var imageBounds: any = [[40.712216, -74.22655], [40.773941, -74.12544]];
            L.imageOverlay(fileJpg, imageBounds).addTo(mapRef.current);
            mapRef.current.fitBounds([[40.712216, -74.22655], [40.773941, -74.12544]])
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