import { FC, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Button, Select, Form, Table, message } from 'antd';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { WhiteList as WhiteListEntity, WhiteListType } from '@/schema/white-list';
import { AddModal, FormValue } from './add-modal';
import { ActionType, getColumns } from './column';
import { SearchBar, TableBox, WhiteListBox } from './styled/box';
import { SearchFormValue, WhiteListProp } from './prop';

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * 白名单管理
 */
const WhiteList: FC<WhiteListProp> = () => {

    const navigate = useNavigate();
    const { modal } = App.useApp();
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [formRef] = useForm<SearchFormValue>();
    const {
        whiteListData,
        whiteListPageIndex,
        whiteListPageSize,
        whiteListTotal,
        whiteListLoading,
        addWhiteList,
        deleteWhiteList,
        queryWhiteListData
    } = useModel(state => ({
        whiteListData: state.whiteListData,
        whiteListPageIndex: state.whiteListPageIndex,
        whiteListPageSize: state.whiteListPageSize,
        whiteListTotal: state.whiteListTotal,
        whiteListLoading: state.whiteListLoading,
        addWhiteList: state.addWhiteList,
        deleteWhiteList: state.deleteWhiteList,
        queryWhiteListData: state.queryWhiteListData
    }));

    useEffect(() => {
        const { setFieldsValue } = formRef;
        setFieldsValue({
            type: -1,
            status: -1
        });
        queryWhiteListData(1, helper.PAGE_SIZE);
    }, []);

    /**
     * 查询Click
     */
    const onSearchClick = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { getFieldsValue } = formRef;
        const values = getFieldsValue();
        message.destroy();
        try {
            await queryWhiteListData(1, helper.PAGE_SIZE, { ...values });
        } catch (error) {
            message.warning(`查询失败: ${error.message}`);
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
     * 功能列Click
     * @param type 列枚举
     * @param record 数据
     */
    const columnClick = (type: ActionType, { id, ruleName }: WhiteListEntity) => {
        switch (type) {
            case ActionType.Delete:
                modal.confirm({
                    async onOk() {
                        message.destroy();
                        try {
                            const res = await deleteWhiteList(id.toString());
                            if (res !== null && res.code === 200) {
                                message.success('删除成功');
                                await queryWhiteListData(1, helper.PAGE_SIZE);
                            } else {
                                message.warning('删除失败');
                            }
                        } catch (error) {
                            message.warning(`删除失败 ${error.message}`);
                        }
                    },
                    okText: '是',
                    cancelText: '否',
                    content: `确认删除「${ruleName}」？`,
                    title: '删除',
                    centered: true
                });
                break;
            default:
                break;
        }
    };

    /**
     * 翻页Change
     * @param pageIndex 页码
     * @param pageSize 页尺寸
     */
    const onPageChange = async (pageIndex: number, pageSize: number = helper.PAGE_SIZE) => {
        const { getFieldsValue } = formRef;
        const values = getFieldsValue();
        message.destroy();
        try {
            await queryWhiteListData(pageIndex, pageSize, { ...values });
        } catch (error) {
            message.warning(`查询失败: ${error.message}`);
        }
    };

    /**
     * 添加
     */
    const onAdd = async (data: FormValue) => {
        message.destroy();
        data.status = 0;
        try {
            const res = await addWhiteList(data);
            if (res !== null && res.code === 200) {
                message.success('添加成功');
                await queryWhiteListData(1, helper.PAGE_SIZE);
            } else {
                message.warning(`添加失败 ${res?.message}`);
            }
        } catch (error) {
            message.warning(`添加失败 ${error.message}`);
        } finally {
            setAddModalOpen(false);
        }
    };

    return <WhiteListBox>
        <SearchBar>
            <div>
                <Form form={formRef} layout="inline">
                    <Item
                        label="类型"
                        name="type">
                        <Select
                            style={{ width: '120px' }}>
                            <Option value={-1}>全部</Option>
                            <Option value={WhiteListType.MAC}>MAC</Option>
                            <Option value={WhiteListType.Freq}>频段</Option>
                        </Select>
                    </Item>
                    <Item
                        label="状态"
                        name="status">
                        <Select style={{ width: '140px' }}>
                            <Option value={-1}>全部</Option>
                            <Option value={0}>生效中</Option>
                            <Option value={1}>未生效</Option>
                        </Select>
                    </Item>
                    <Item>
                        <Button
                            onClick={onSearchClick}
                            type="primary">查询</Button>
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
                    添加白名单
                </Button>
            </div>
        </SearchBar>
        <TableBox>
            <Table<WhiteListEntity>
                pagination={{
                    onChange: onPageChange,
                    current: whiteListPageIndex,
                    pageSize: whiteListPageSize,
                    total: whiteListTotal,
                    showSizeChanger: false
                }}
                columns={getColumns(columnClick)}
                dataSource={whiteListData}
                loading={whiteListLoading}
                rowKey="id"
                size="middle"
            />
        </TableBox>
        <AddModal
            open={addModalOpen}
            onCancel={() => setAddModalOpen(false)}
            onOk={onAdd}
        />
    </WhiteListBox>
};

export { WhiteList };