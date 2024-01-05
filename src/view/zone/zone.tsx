import { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Form, Button, Input, Table, message } from 'antd';
import { useModel } from '@/model';
import { Zone as ZoneEntity } from '@/schema/zone';
import { helper } from '@/utility/helper';
import { RequestResult } from '@/utility/http';
import { EditModal } from './edit-modal';
import { BackgroundPreviewModal } from './background-preview-modal';
import { getColumns } from './column';
import { SearchBar, TableBox, ZoneBox } from './styled/box';
import { ActionType, ZoneProp } from './prop';

const { Item, useForm } = Form;

/**
 * 涉密区域管理
 */
const Zone: FC<ZoneProp> = () => {

    const { modal } = App.useApp();
    const navigate = useNavigate();
    const bgImageRef = useRef<string>();
    const editDataRef = useRef<ZoneEntity>();
    const [formRef] = useForm<{ areaName: string }>();
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [backgroundPreviewModalOpen, setBackgroundPreviewModalOpen] = useState<boolean>(false);
    const {
        zoneData,
        zoneLoading,
        zoneTotal,
        zonePageIndex,
        zonePageSize,
        queryZoneData,
        addZone,
        updateZone,
        deleteZone
    } = useModel((state) => ({
        zoneData: state.zoneData,
        zoneTotal: state.zoneTotal,
        zoneLoading: state.zoneLoading,
        zonePageIndex: state.zonePageIndex,
        zonePageSize: state.zonePageSize,
        queryZoneData: state.queryZoneData,
        addZone: state.addZone,
        updateZone: state.updateZone,
        deleteZone: state.deleteZone
    }));

    useEffect(() => {
        queryZoneData(1, helper.PAGE_SIZE, {});
    }, []);

    const onColumnClick = (action: ActionType, data: ZoneEntity) => {

        switch (action) {
            case ActionType.Edit:
                editDataRef.current = data;
                setEditModalOpen(true);
                break;
            case ActionType.Delete:
                modal.confirm({
                    async onOk() {
                        message.destroy();
                        try {
                            const res = await deleteZone(data);
                            if (res !== null && res.code === 200) {
                                queryZoneData(1, helper.PAGE_SIZE, {});
                                setEditModalOpen(false);
                                message.success('删除成功');
                            } else {
                                message.warning(`删除失败 ${res?.message}`);
                            }
                        } catch (error) {
                            message.warning(`删除失败 ${error.message}`);
                        }
                    },
                    centered: true,
                    okText: '是',
                    cancelText: '否',
                    title: '删除',
                    content: `确认删除「${data.areaName}」？`
                });
                break;
            case ActionType.Preview:
                bgImageRef.current = data.areaBg;
                setBackgroundPreviewModalOpen(true)
                break;
            default:
                break;
        }
    };

    /**
     * 返回Click
     */
    const onGoBackClick = (event: MouseEvent) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    const onPageChange = (pageIndex: number, pageSize: number = helper.PAGE_SIZE) =>
        queryZoneData(pageIndex, pageSize, {});

    const onSearch = () => {
        const { getFieldsValue } = formRef;
        const values = getFieldsValue();
        queryZoneData(1, helper.PAGE_SIZE, values);
    };

    /**
     * 保存handle
     * @param values 数据
     * @param isEdit 添加/编辑
     */
    const onSave = async (values: ZoneEntity, isEdit: boolean) => {
        message.destroy();
        let res: RequestResult<any> | null = null;
        try {
            if (isEdit) {
                res = await updateZone(values);
                editDataRef.current = undefined;
            } else {
                res = await addZone(values);
            }

            if (res !== null && res.code === 200) {
                queryZoneData(1, helper.PAGE_SIZE, {});
                setEditModalOpen(false);
                message.success('保存成功');
            } else {
                message.warning(`保存失败 ${res?.message}`);
            }
        } catch (error) {
            message.warning(`保存失败 ${error.message}`);
        }
    };

    return <ZoneBox>
        <SearchBar>
            <div>
                <Form form={formRef} layout="inline">
                    <Item
                        name="areaName"
                        label="区域名称">
                        <Input />
                    </Item>
                    <Item>
                        <Button
                            onClick={() => onSearch()}
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
                    onClick={() => setEditModalOpen(true)}
                    type="primary">添加区域</Button>
            </div>
        </SearchBar>
        <TableBox>
            <Table<ZoneEntity>
                columns={getColumns(onColumnClick)}
                pagination={{
                    onChange: onPageChange,
                    current: zonePageIndex,
                    pageSize: zonePageSize,
                    total: zoneTotal,
                    showSizeChanger: false,
                    showTotal: (total) => `共${total}条`
                }}
                loading={zoneLoading}
                dataSource={zoneData}
                rowKey="id" />
        </TableBox>
        <EditModal
            open={editModalOpen}
            data={editDataRef.current}
            onCancel={() => {
                editDataRef.current = undefined;
                setEditModalOpen(false);
            }}
            onOk={onSave}
        />
        <BackgroundPreviewModal
            open={backgroundPreviewModalOpen}
            bg={bgImageRef.current}
            onCancel={() => {
                bgImageRef.current = undefined;
                setBackgroundPreviewModalOpen(false);
            }}
        />
    </ZoneBox>
};

export { Zone };