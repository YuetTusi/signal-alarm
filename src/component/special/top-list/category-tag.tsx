
import { FC } from 'react';
import { Protocol } from '@/schema/protocol';
import { ProtocolIcon } from './styled/box';
import ChinaMobileGSM from '@/assets/image/chinamobilegsm.png';
import ChinaUnicomGSM from '@/assets/image/chinaunicomgsm.png';
import ChinaTelecomCDMA from '@/assets/image/chinatelecomcdma.png';
import ChinaUnicomWCDMA from '@/assets/image/ChinaUnicomwcdma.png';
import ChinaMobileTDDLTE from '@/assets/image/chinamobiletddlte.png';
import ChinaUnicomFDDLTE from '@/assets/image/chinaunicomfddlte.png';
import ChinaTelecomFDDLTE from '@/assets/image/ChinaTelecomfddlte.png';
import ChinaMobile5G from '@/assets/image/chinamobile5g.png';
import ChinaUnicom5G from '@/assets/image/chinaunicom5G.png';
import ChinaBroadnet5G from '@/assets/image/chinabroadnet5g.png';
import ChinaTelecom5G from '@/assets/image/chinatelecom5g.png';
import Detectaphone from '@/assets/image/detectaphone.png';
import Bluetooth from '@/assets/image/bluetooth.png';
import Wifi24 from '@/assets/image/wifi24.png';
import Wifi58 from '@/assets/image/wifi58.png';
import GpsLocator from '@/assets/image/gpslocator.png';
import Camera from '@/assets/image/camera.png';
import Others from '@/assets/image/others.png';
import { SpecialBase } from '@/schema/special-base';

const CategoryTag: FC<{ data: SpecialBase }> = ({ data }) => {

    switch (data.protocolType) {
        case Protocol.ChinaMobileGSM:
            return <ProtocolIcon url={ChinaMobileGSM} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.ChinaUnicomGSM:
            return <ProtocolIcon url={ChinaUnicomGSM} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.ChinaTelecomCDMA:
            return <ProtocolIcon url={ChinaTelecomCDMA} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.ChinaUnicomWCDMA:
            return <ProtocolIcon url={ChinaUnicomWCDMA} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.ChinaMobileTDDLTE:
            return <ProtocolIcon url={ChinaMobileTDDLTE} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.ChinaUnicomFDDLTE:
            return <ProtocolIcon url={ChinaUnicomFDDLTE} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.ChinaTelecomFDDLTE:
            return <ProtocolIcon url={ChinaTelecomFDDLTE} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.ChinaMobile5G:
            return <ProtocolIcon url={ChinaMobile5G} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.ChinaUnicom5G:
            return <ProtocolIcon url={ChinaUnicom5G} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.ChinaBroadnet5G:
            return <ProtocolIcon url={ChinaBroadnet5G} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.ChinaTelecom5G:
            return <ProtocolIcon url={ChinaTelecom5G} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.Bluetooth50:
            return <ProtocolIcon url={Bluetooth} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.WiFi24G:
            return <ProtocolIcon url={Wifi24} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.WiFi58G:
            return <ProtocolIcon url={Wifi58} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.Detectaphone:
            return <ProtocolIcon url={Detectaphone} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.GPSLocator:
            return <ProtocolIcon url={GpsLocator} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.Camera:
            return <ProtocolIcon url={Camera} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        case Protocol.Others:
            return <ProtocolIcon url={Others} className={data.isConnect === 0 ? 'disconnect' : undefined} />;
        default:
            console.log(data.protocolType);
            return null;
    }
};

export { CategoryTag };