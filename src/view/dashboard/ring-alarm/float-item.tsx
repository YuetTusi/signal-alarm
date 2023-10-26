import { PhoneAlarmInfo } from '@/schema/phone-alarm-info';
import { FC } from 'react';


const FloatItem: FC<{ data: PhoneAlarmInfo }> = ({ data }) => {
    let json: Record<string, any> = {};
    try {
        if (typeof data.message === 'string') {
            json = JSON.parse(data.message);
        } else {
            json = data?.message ?? {};
        }
    } catch (error) {
        console.warn('推送message转换JSON失败', error.message);
    }

    return <div className="cell">
        <div className="floating">
            <ul>
                <li>{json?.captureTime ?? '-'}</li>
                <li>{json.protocol ?? '-'}</li>
                <li className="yellow">{json.rssi ?? '-'}</li>
            </ul>
        </div>
    </div>;
};

export { FloatItem };