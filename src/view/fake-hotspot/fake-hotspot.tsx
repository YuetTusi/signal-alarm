import dayjs from 'dayjs';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, Select, Table, message } from 'antd';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { FakeHotspot as FakeHotspotEntity } from '@/schema/fake-hotspot';
import { AddModal } from './add-modal';
import { FakeHotspotBox, SearchBar, TableBox } from './styled/box';
import { getColumns } from './column';
import { FakeHotspotProp } from './prop';

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
        addFakeHotspot,
        queryFakeHotspotData
    } = useModel(state => ({
        fakeHotspotData: state.fakeHotspotData,
        fakeHotspotPageIndex: state.fakeHotspotPageIndex,
        fakeHotspotPageSize: state.fakeHotspotPageSize,
        fakeHotspotLoading: state.fakeHotspotLoading,
        fakeHotspotTotal: state.fakeHotspotTotal,
        addFakeHotspot: state.addFakeHotspot,
        queryFakeHotspotData: state.queryFakeHotspotData
    }));

    const navigate = useNavigate();
    const [addModalOpen, setAddModalOpen] = useState(false);
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

    /**
     * 添加伪热点Save
     * @param data 表单数据
     */
    const onSave = async (data: FakeHotspotEntity) => {
        message.destroy();
        const { getFieldsValue } = formRef;
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
        try {
            const res = await addFakeHotspot({
                ...data,
                count: 0,
                updateTime: now,
                createTime: now
            });

            if (res !== null && res.code === 200) {
                message.success('添加成功');
                setAddModalOpen(false);
                const values = getFieldsValue();
                await queryFakeHotspotData(1, helper.PAGE_SIZE, values);
            } else {
                message.warning('添加失败');
            }
        } catch (error) {
            console.warn(error);
            message.warning(`添加失败 (${error.message})`);
        }
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
                    onClick={() => setAddModalOpen(true)}
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
        <AddModal
            open={addModalOpen}
            onOk={onSave}
            onClose={() => setAddModalOpen(false)}
        />
    </FakeHotspotBox>;
};

export { FakeHotspot };