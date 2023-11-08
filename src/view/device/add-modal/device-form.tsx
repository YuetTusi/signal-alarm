import { FC, useEffect, useState, useRef, MouseEvent } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useModel } from '@/model';
import { IP } from '@/utility/regex';
import { ComDevice } from '@/schema/com-device';
import { request } from '@/utility/http';
import { helper } from '@/utility/helper';
import { PointModal } from '../point-modal';
import { DeviceFormProp } from './prop';
import { PointInputBox } from './styled/box';

const { Item } = Form;
const { Option } = Select;
const formLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
const bg = 'data:image/png;base64,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';

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

    const renderZoneOptions = () =>
        zoneList.map((item) =>
            <Option
                value={item.id}
                data-bg={item.areaBg}
                key={`ZL_${item.id}`}>
                {item.areaName}
            </Option>
        );

    const onZoneChange = (value: any, options: any) => {
        console.log(value);
        console.log(options);
        setFieldValue('point', '');
        pointRef.current = [0, 0];
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
                        const point: string = (event.target as any).value;
                        if (point) {
                            const [x, y] = point.split(',');
                            pointRef.current = [Number(x), Number(y)];
                        } else {
                            pointRef.current = [0, 0];
                        }
                        setPointModalOpen(true);
                    }}
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
            background={bg}
            onCancel={() => setPointModalOpen(false)}
            onOk={(x, y) => {
                if (x === 0 && y === 0) {
                    setPointModalOpen(false);
                } else {
                    setFieldValue('point', `${x},${y}`);
                    setPointModalOpen(false);
                }
            }} />
    </>
};

export { DeviceForm };