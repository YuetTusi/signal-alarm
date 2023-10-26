import { FC, useEffect } from 'react';
import { useModel } from '@/model';
import { PointItem } from './point-item';
import { DevAlarmBox } from './styled/box';
import { DevAlarmProp } from './prop';

/**
 * 设备报警组件
 */
const DevAlarm: FC<DevAlarmProp> = () => {

    const {
        deviceList,
        queryDeviceList
    } = useModel((state) => ({
        deviceList: state.deviceList,
        queryDeviceList: state.queryDeviceList
    }));

    useEffect(() => {
        queryDeviceList();
    }, []);

    const renderItem = () =>
        deviceList.map((data, index) => <PointItem
            data={data}
            key={`DI_${index}`} />
        );

    return <DevAlarmBox id="devAlarmBox">
        {renderItem()}
    </DevAlarmBox>
};

export { DevAlarm };