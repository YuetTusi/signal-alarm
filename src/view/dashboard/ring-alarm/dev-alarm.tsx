import chunk from 'lodash/chunk';
import { FC, useEffect } from 'react';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
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

    const renderItem = () => {

        const top = deviceList.slice(0, 6).map((item, index) => <PointItem
            data={item}
            key={`DevTOP_${index}`} />); //前6个元素一行3个，不必添加空元素
        const bottom = chunk(deviceList.slice(6), 2).reduce((acc, current, index) => {
            acc.push(<PointItem data={current[0]} key={`DevBOTTOM_${Math.random().toString()}`} />);
            acc.push(<div className="cell" key={`DevEmpty_${helper.nextId()}`}></div>);
            acc.push(<PointItem data={current[1]} key={`DevBOTTOM_${Math.random().toString()}`} />);
            return acc;
        }, [] as JSX.Element[]);//后面元素每行加一个空div，为隔开中间背景

        return [...top, ...bottom];

        // return deviceList.map((data, index) => <PointItem
        //     data={data}
        //     key={`DI_${index}`} />
        // );
    }

    return <DevAlarmBox id="devAlarmBox">
        {renderItem()}
    </DevAlarmBox>
};

export { DevAlarm };