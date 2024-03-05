import { FC, useEffect, useState, useRef, MouseEvent } from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { Form, Input, Select, message } from 'antd';
import { useModel } from '@/model';
import { IP } from '@/utility/regex';
import { Zone } from '@/schema/zone';
import { ComDevice } from '@/schema/com-device';
import { request } from '@/utility/http';
import { helper } from '@/utility/helper';
import { PointModal } from '../point-modal';
import { DeviceFormProp } from './prop';


const { Item } = Form;
const { Option } = Select;
const formLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };

/**
 * 验证设备id是否存在
 * @param deviceId 设备id
 * @param id 主键
 */
const deviceIdExist = async (deviceId: string, id?: number) => {
    let list: ComDevice[] = [];
    try {
        const res = await request
            .get<{ records: ComDevice[] }>('/devops/device/1/1000000000000000000');
        if (res !== null && res.code === 200) {
            list = res.data.records;
        }
        if (helper.isNullOrUndefined(id)) {
            //添加
            const exist = list.some(item => item?.deviceId === deviceId);
            return exist
                ? Promise.reject(new Error('设备ID已存在'))
                : Promise.resolve('设备id不存在');
        } else {
            //编辑
            const exist = list
                .filter(item => item?.id !== id)
                .some(item => item?.deviceId === deviceId);
            return exist
                ? Promise.reject(new Error('设备ID已存在'))
                : Promise.resolve('设备id不存在');
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * 表单
 * @returns 
 */
const DeviceForm: FC<DeviceFormProp> = ({ data, formRef }) => {

    const pointRef = useRef<[number, number]>([0, 0]);
    const whRef = useRef<[number, number]>([0, 0]);
    const [bg, setBg] = useState<string>('');
    const [bgLoading, setBgLoading] = useState<boolean>(false);
    const { setFieldValue, setFieldsValue } = formRef;
    const [pointModalOpen, setPointModalOpen] = useState<boolean>(false);

    const {
        zoneList
    } = useModel(state => ({
        zoneList: state.zoneList
    }));

    useEffect(() => {
        if (data) {
            if (helper.isNullOrUndefined(data.lat) || helper.isNullOrUndefined(data.lon)) {
                setFieldsValue({
                    ...data,
                    point: ''
                });
            } else {
                setFieldsValue({
                    ...data,
                    point: `${data.lat},${data.lon}`
                });
            }
        } else {
            setFieldValue('status', 1);
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            (async () => {
                try {
                    const zone = await queryZone(data.areaId);
                    if (zone === null) {
                        whRef.current = [0, 0];
                        setBg('');
                    } else {
                        whRef.current = [zone.areaWidth, zone.areaHeight];
                        if (zone.areaBg.startsWith('data:image/png;base64,')) {
                            setBg(zone.areaBg);
                        } else {
                            setBg('data:image/png;base64,' + zone.areaBg);
                        }
                    }
                } catch (error) {
                    console.warn(error);
                }
            })();
        } else {
            setBg('');
        }
    }, [data]);

    const renderZoneOptions = () =>
        zoneList.map((item) =>
            <Option
                value={item.id}
                data-bg={item.areaBg}
                key={`ZL_${item.id}`}>
                {item.areaName}
            </Option>
        );

    /**
     * 查询区域
     * @param id 区域id
     */
    const queryZone = async (id: string) => {
        setBgLoading(true);
        try {
            const res = await request.get<Zone>(
                `/sys/area/get-area-info/${id}`);
            if (res !== null && res.code === 200) {
                return res.data;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        } finally {
            setBgLoading(false);
        }
    };

    /**
     * 区域下拉Change
     */
    const onZoneChange = async (value: any, _: any) => {

        setFieldValue('point', '');
        pointRef.current = [0, 0];
        setBgLoading(true);
        try {
            const zone = await queryZone(value);
            if (zone === null) {
                whRef.current = [0, 0];
                setBg('');
            } else {
                whRef.current = [zone.areaWidth, zone.areaHeight];
                if (zone.areaBg.startsWith('data:image/png;base64,')) {
                    setBg(zone.areaBg);
                } else {
                    setBg('data:image/png;base64,' + zone.areaBg);
                }
            }
        } catch (error) {
            console.warn(error);
        } finally {
            setBgLoading(false);
        }
    };

    return <>
        <Form
            form={formRef}
            preserve={false}
            layout="horizontal"
            {...formLayout}>
            <Item
                rules={[
                    { required: true, message: '请选择区域' }
                ]}
                label="所属区域"
                name="areaId">
                <Select onChange={onZoneChange}>
                    {renderZoneOptions()}
                </Select>
            </Item>
            <Item
                rules={[
                    { required: true, message: '请填写设备ID' },
                    { pattern: /^[a-zA-Z0-9-_]+$/, message: '数字，英文' },
                    () => ({
                        validator(_, value) {
                            if (!helper.isNullOrUndefined(value)) {
                                return deviceIdExist(value, data?.id);
                            } else {
                                return Promise.resolve();
                            }
                        },
                    }),
                ]}
                name="deviceId"
                label="设备ID">
                <Input placeholder="数字，英文，下划线，横杠；不可重复" disabled={data !== undefined} />
            </Item>
            <Item
                rules={[
                    { required: true, message: '请填写设备IP' },
                    { pattern: IP, message: '请填写合法IP地址' }
                ]}
                name="deviceIp"
                label="设备IP">
                <Input placeholder="IP地址，如127.0.0.1" />
            </Item>
            <Item
                rules={[
                    { required: true, message: '请填写设备名称' }
                ]}
                name="deviceName"
                label="设备名称">
                <Input />
            </Item>
            <Item
                rules={[
                    { required: true, message: '请填写设备场所' }
                ]}
                name="siteName"
                label="设备场所">
                <Input />
            </Item>
            <Item
                rules={[
                    { required: true, message: '请选择坐标位置' }
                ]}
                label="设备位置"
                name="point">
                <Input
                    onClick={(event: MouseEvent<HTMLElement>) => {
                        message.destroy();
                        if (bgLoading) {
                            message.info('正在读取区域图像，请稍等');
                        } else if (bg === '') {
                            message.info('请选择所属区域');
                        } else {
                            const point: string = (event.target as any).value;
                            if (point) {
                                const [x, y] = point.split(',');
                                pointRef.current = [Number(x), Number(y)];
                            } else {
                                pointRef.current = [0, 0];
                            }
                            setPointModalOpen(true);
                        }
                    }}
                    suffix={bgLoading ? <LoadingOutlined /> : undefined}
                    readOnly={true} />
            </Item>
            <Item
                rules={[
                    { required: true, message: '请选择状态' }
                ]}
                name="status"
                label="状态">
                <Select>
                    <Option value={1}>工作</Option>
                    <Option value={0}>异常</Option>
                </Select>
            </Item>
        </Form>
        <PointModal
            open={pointModalOpen}
            x={pointRef.current[0]}
            y={pointRef.current[1]}
            width={whRef.current[0]}
            height={whRef.current[1]}
            background={bg}
            onCancel={() => setPointModalOpen(false)}
            onOk={(x, y) => {
                if (x === 0 && y === 0) {
                    setPointModalOpen(false);
                } else {
                    setFieldsValue({ point: `${x},${y}` });
                    setPointModalOpen(false);
                }
            }} />
    </>
};

export { DeviceForm };