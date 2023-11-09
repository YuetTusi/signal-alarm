import L from 'leaflet';
import { FC, useEffect } from 'react';
import { Form, Select } from 'antd';
import { useModel } from '@/model';
import { BiboBox } from './styled/box';
import { SearchFormValue } from './prop';

const { useForm, Item } = Form;
const { Option } = Select;

/**
 * 设备报警（地图版本）
 */
const Bibo: FC<{}> = () => {

    const [formRef] = useForm<SearchFormValue>();
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
            const [first] = zoneList;
            formRef.setFieldValue('zone', first.id);
        }
    }, [zoneList]);

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
                    <Select style={{ width: '160px' }}>
                        {bindZoneOption()}
                    </Select>
                </Item>
            </Form>
        </div>
        <div id="bibo">

        </div>
    </BiboBox>
};

export { Bibo };