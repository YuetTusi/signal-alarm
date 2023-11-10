import markerIconPng from '@/assets/image/marker-icon.png';
import L, { LatLngBoundsLiteral } from 'leaflet';
import { FC, useEffect, useState } from 'react';
import { Form, Spin, Select } from 'antd';
import { useModel } from '@/model';
import { request } from '@/utility/http';
import { Zone } from '@/schema/zone';
import { ComDevice } from '@/schema/com-device';
import { BiboBox, MaskBox } from './styled/box';
import { SearchFormValue } from './prop';
import { useUnmount } from '@/hook';

const { useForm, Item } = Form;
const { Option } = Select;
let map: L.Map | null = null;
let marks: L.Marker[] = [];
const defaultIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconAnchor: [12, 44]
});
let imageBounds: LatLngBoundsLiteral = [[40.712216, -74.22655], [40.773941, -74.12544]];

/**
 * 清空还原地图
 * @param domId 地图DOM id
 * @param mapInstance 地图实例
 */
const initMap = (domId: string, mapInstance: L.Map) => {
    if (mapInstance !== null) {
        mapInstance.remove();
    }
    var container = L.DomUtil.get(domId);
    if (container !== null) {
        (container as any)._leaflet_id = null;
    }
};

/**
 * 加载地图
 * @param domId 地图DOMid 
 * @param background 地图图像
 */
const loadMap = (domId: string, background: string): L.Map => {
    let bg = background;
    map = L.map(domId, {
        zoomControl: false,
        doubleClickZoom: false,
        attributionControl: false,
        maxBounds: imageBounds
    });
    if (!background.startsWith('data:image/png;base64,')) {
        bg = 'data:image/png;base64,' + background;
    }
    L.imageOverlay(bg, imageBounds).addTo(map);
    map.fitBounds(imageBounds);
    map.setMinZoom(11);
    map.setMaxZoom(15);

    return map;
};

/**
 * 加载设备，返回所属区域下设备坐标点
 * @param id 区域id
 */
const loadDevice = async (id: number) => {
    const url = `/sys/area/get-device-info/${id}`;
    try {
        const res = await request.get<ComDevice[]>(url);
        if (res !== null && res.code === 200 && map !== null) {
            return res.data.map(item =>
                L.marker([
                    item.lat, item.lon
                ], {
                    icon: defaultIcon,
                    title: item.deviceName
                }).addTo(map!));
        } else {
            return [];
        }
    } catch (error) {
        console.warn(error);
        return [];
    }
};

/**
 * 设备报警（地图版本）
 */
const Bibo: FC<{}> = () => {

    const [formRef] = useForm<SearchFormValue>();
    const [loading, setLoading] = useState<boolean>(false);
    const {
        zoneList,
        queryZoneList
    } = useModel(state => ({
        zoneList: state.zoneList,
        queryZoneList: state.queryZoneList
    }));

    useEffect(() => {
        queryZoneList();
    }, []);

    useEffect(() => {
        if (zoneList.length > 0) {
            (async () => {
                setLoading(true);
                const [first] = zoneList;
                formRef.setFieldValue('zone', first.id);
                try {
                    const res = await request.get<Zone>(`/sys/area/get-area-info/${first.id}`);
                    if (res !== null && res.code === 200) {
                        loadMap('bibo', res.data.areaBg);
                        await loadDevice(first.id);
                    }
                } catch (error) {
                    console.warn(error);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [zoneList]);

    useUnmount(() => {
        if (map !== null) {
            initMap('bibo', map);
        }
    });

    /**
     * 区域Change
     */
    const onZoneChange = async (value: number) => {
        setLoading(true);
        try {
            const res = await request.get<Zone>(`/sys/area/get-area-info/${value}`);
            if (res !== null && res.code === 200) {

                if (map !== null) {
                    initMap('bibo', map);
                }
                loadMap('bibo', res.data.areaBg);
            }
            const devices = await loadDevice(value);//

        } catch (error) {
            console.warn(error);
        } finally {
            setLoading(false);
        }
    };

    const bindZoneOption = () =>
        zoneList.map(item => <Option
            value={item.id}
            key={`ZO_${item.id}`}>
            {item.areaName}
        </Option>);

    return <BiboBox>
        <div className="d-box">
            <Form form={formRef} layout="inline">
                <Item
                    name="zone"
                    label="涉密区域">
                    <Select
                        onChange={onZoneChange}
                        style={{ width: '180px' }}>
                        {bindZoneOption()}
                    </Select>
                </Item>
            </Form>
        </div>
        <div className="map-box" id="bibo">

        </div>
        <MaskBox style={{ display: loading ? 'flex' : 'none' }}>
            <Spin
                tip="加载中"
                style={{
                    color: '#b4cdff'
                }} />
        </MaskBox>
    </BiboBox>
};

export { Bibo };