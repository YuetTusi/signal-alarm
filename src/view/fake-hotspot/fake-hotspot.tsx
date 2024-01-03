import { FC, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, Select, Table } from 'antd';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { FakeHotspot as FakeHotspotEntity } from '@/schema/fake-hotspot';
import { FakeHotspotBox, SearchBar, TableBox } from './styled/box';
import { FakeHotspotProp } from './prop';
import { getColumns } from './column';

const { Option } = Select;
const { Item, useForm } = Form;

/**
 * 伪热点 
 */
const FakeHotspot: FC<FakeHotspotProp> = () => {

    const {
        fakeHotspotData,
        fakeHotspotPageIndex,
        fakeHotspotPageSize,
        fakeHotspotLoading,
        fakeHotspotTotal,
        queryFakeHotspotData
    } = useModel(state => ({
        fakeHotspotData: state.fakeHotspotData,
        fakeHotspotPageIndex: state.fakeHotspotPageIndex,
        fakeHotspotPageSize: state.fakeHotspotPageSize,
        fakeHotspotLoading: state.fakeHotspotLoading,
        fakeHotspotTotal: state.fakeHotspotTotal,
        queryFakeHotspotData: state.queryFakeHotspotData
    }));

    const navigate = useNavigate();
    const [formRef] = useForm<FakeHotspotEntity>();

    useEffect(() => {
        formRef.setFieldsValue({ status: -1 });
        queryFakeHotspotData(1, helper.PAGE_SIZE, { status: -1 });
    }, []);

    const onSearchSubmit = async (event: MouseEvent) => {
        event.preventDefault();
        const { getFieldsValue } = formRef;
        try {
            const values = getFieldsValue();
            await queryFakeHotspotData(1, helper.PAGE_SIZE, values);
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 返回主页Click
     */
    const onGoBackClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    const onPageChange = async (pageIndex: number, pageSize: number) => {
        const { getFieldsValue } = formRef;
        try {
            const values = getFieldsValue();
            await queryFakeHotspotData(pageIndex, pageSize, values);
        } catch (error) {
            console.warn(error);
        }
    };

    return <FakeHotspotBox>
        <SearchBar>
            <div>
                <Form form={formRef} layout="inline">
                    <Item
                        label="名称"
                        name="hotspotName">
                        <Input />
                    </Item>
                    <Item
                        label="伪MAC地址"
                        name="fakeMac">
                        <Input style={{ width: '150px' }} />
                    </Item>
                    <Item
                        label="真实MAC地址"
                        name="realMac">
                        <Input style={{ width: '150px' }} />
                    </Item>
                    <Item
                        label="状态"
                        name="status">
                        <Select style={{ width: '100px' }}>
                            <Option value={-1}>全部</Option>
                            <Option value={0}>已生效</Option>
                            <Option value={1}>未生效</Option>
                        </Select>
                    </Item>
                    <Item>
                        <Button
                            onClick={onSearchSubmit}
                            type="primary">
                            查询
                        </Button>
                    </Item>
                    <Item>
                        <Button
                            onClick={onGoBackClick}
                            type="default">返回主页</Button>
                    </Item>
                </Form>
            </div>
            <div>
                <Button
                    onClick={() => { }}
                    type="primary">
                    添加伪热点
                </Button>
            </div>
        </SearchBar>
        <TableBox>
            <Table<FakeHotspotEntity>
                columns={getColumns(() => { })}
                dataSource={fakeHotspotData}
                loading={fakeHotspotLoading}
                pagination={
                    {
                        current: fakeHotspotPageIndex,
                        pageSize: fakeHotspotPageSize,
                        total: fakeHotspotTotal,
                        onChange: onPageChange
                    }
                }
                rowKey="id"
            />
        </TableBox>
    </FakeHotspotBox>;
};

export { FakeHotspot };