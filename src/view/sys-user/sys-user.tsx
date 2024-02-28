import dayjs from 'dayjs';
import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Select, Form, Table, message } from 'antd';
import { SearchBar, SysUserBox, TableBox } from './styled/box';
import { useModel } from '@/model';
import { request } from '@/utility/http';
import { helper } from '@/utility/helper';
import { SystemUser } from '@/schema/system-user';
import { EditModal } from './edit-modal';
import { DetailModal } from './detail-modal';
import { PasswordModal } from './password-modal';
import { StatusModal } from './status-modal';
import { getColumns } from './column';
import { ColumnAction, SearchFormValue } from './prop';

import { SystemRole } from '@/schema/system-role';

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * 用户管理
 */
const SysUser: FC<{}> = () => {

    const navigate = useNavigate();
    const currentData = useRef<SystemUser>();
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [formRef] = useForm<SearchFormValue>();
    const {
        sysRoleList,
        sysUserData,
        sysUserLoading,
        sysUserPageIndex,
        sysUserPageSize,
        sysUserTotal,
        querySysRoleList,
        querySysUserData,
        addSysUser,
        modifySysUserPassword,
        modifySysUserStatus
    } = useModel(state => ({
        sysRoleList: state.sysRoleList,
        sysUserData: state.sysUserData,
        sysUserLoading: state.sysUserLoading,
        sysUserPageIndex: state.sysUserPageIndex,
        sysUserPageSize: state.sysUserPageSize,
        sysUserTotal: state.sysUserTotal,
        querySysRoleList: state.querySysRoleList,
        querySysUserData: state.querySysUserData,
        addSysUser: state.addSysUser,
        modifySysUserPassword: state.modifySysUserPassword,
        modifySysUserStatus: state.modifySysUserStatus
    }));

    useEffect(() => {
        querySysRoleList();
        querySysUserData(1, 15);
    }, []);

    /**
     * 查询Click
     * @param event 
     */
    const onSearchClick = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const { getFieldsValue } = formRef;
        const { keyword, roleId } = getFieldsValue();
        try {
            await querySysUserData(1, 15, { keyword, roleId });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 返回Click
     * @param event 
     */
    const onGoBackClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    /**
     * 翻页Change
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     */
    const onPageChange = async (pageIndex: number, pageSize: number) => {
        const { getFieldsValue } = formRef;
        const { keyword, roleId } = getFieldsValue();
        try {
            await querySysUserData(pageIndex, pageSize, { keyword, roleId });
        } catch (error) {
            console.warn(error);
        }
    };

    /**
     * 修改密码
     * @param id id
     * @param newPassword 新密码 
     * @param oldPassword 旧密码
     */
    const onPasswordModify = async (id: number, newPassword: string, oldPassword: string) => {
        message.destroy();
        try {
            const res = await modifySysUserPassword(id, newPassword, oldPassword);
            if (res !== null && res.code === 200) {
                message.success('修改成功');
                setPasswordModalOpen(false);
            } else {
                message.warning(`修改失败 ${res?.message ?? ''}`);
            }
        } catch (error) {
            message.warning(`修改失败 ${error.message}`);
        }
    };

    /**
     * 修改状态
     * @param id id
     * @param status 状态
     */
    const onStatusModify = async (id: number, status: number) => {
        message.destroy();
        try {
            const res = await modifySysUserStatus(id, status);
            if (res !== null && res.code === 200) {
                message.success('修改成功');
                querySysUserData(1, helper.PAGE_SIZE);
            } else {
                message.warning(`修改失败 ${res?.message ?? ''}`);
            }
        } catch (error) {
            message.warning(`修改失败 ${error.message}`);
        } finally {
            setStatusModalOpen(false);
        }
    };

    /**
     * 添加/编辑保存
     * @param data 用户数据
     */
    const onSaveOrEdit = async (data: SystemUser) => {
        message.destroy();
        try {
            if (data.id === undefined) {
                let list: SystemRole[] = [];
                for (let i = 0; i < data.roleList.length; i++) {
                    const r = sysRoleList.find(item => item.id === data.roleList[i]);
                    if (r) {
                        list.push(r);
                    }
                }
                const res = await addSysUser(data);
                if (res !== null && res.code === 200) {
                    message.success('保存成功');
                    querySysUserData(1, helper.PAGE_SIZE, {});
                } else {
                    message.warning(`保存失败 ${res?.message ?? ''}`);
                }
                setEditModalOpen(false);
            } else {

            }
        } catch (error) {
            console.warn(error);
            message.warning(`保存失败 ${error.message}`);
        }
    };

    const columnClick = (type: ColumnAction, data: SystemUser) => {

        currentData.current = data;
        switch (type) {
            case ColumnAction.Detail:
                setDetailModalOpen(true);
                break;
            case ColumnAction.Edit:
                setEditModalOpen(true);
                break;
            case ColumnAction.ModifyPassword:
                setPasswordModalOpen(true);
                break;
            case ColumnAction.ModifyStatus:
                setStatusModalOpen(true);
                break;
        }
    };

    const renderOption = useCallback(() =>
        sysRoleList.map(item =>
            <Option value={item.id} key={`SUR_${item.id}`}>{item.roleName}</Option>
        ), [sysRoleList]);

    return <SysUserBox>
        <SearchBar>
            <div>
                <Form form={formRef} layout="inline">
                    <Item
                        name="keyword"
                        label="关键字">
                        <Input />
                    </Item>
                    <Item
                        initialValue={-1}
                        name="roleId"
                        label="角色">
                        <Select style={{ width: '180px' }}>
                            {[
                                <Option value={-1} key="SUR_ALL">全部</Option>,
                                ...renderOption()
                            ]}
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
                    onClick={() => setEditModalOpen(true)}
                    type="primary">添加</Button>
            </div>
        </SearchBar>
        <TableBox>
            <Table<SystemUser>
                columns={getColumns(columnClick)}
                dataSource={sysUserData}
                loading={sysUserLoading}
                rowKey={(record) => `SURT_${record.id}`}
                pagination={{
                    onChange: onPageChange,
                    current: sysUserPageIndex,
                    pageSize: sysUserPageSize,
                    total: sysUserTotal,
                    showSizeChanger: false,
                    showTotal: (total) => `共${total}条`
                }}
                size="middle"
            />
        </TableBox>
        <EditModal
            open={editModalOpen}
            data={currentData.current}
            onOk={onSaveOrEdit}
            onCancel={() => {
                currentData.current = undefined;
                setEditModalOpen(false);
            }}
        />
        <DetailModal
            open={detailModalOpen}
            data={currentData.current!}
            onCancel={() => {
                currentData.current = undefined;
                setDetailModalOpen(false);
            }} />
        <PasswordModal
            open={passwordModalOpen}
            data={currentData.current!}
            onCancel={() => setPasswordModalOpen(false)}
            onOk={onPasswordModify}
        />
        <StatusModal
            open={statusModalOpen}
            data={currentData.current!}
            onCancel={() => setStatusModalOpen(false)}
            onOk={onStatusModify}
        />
    </SysUserBox>;
};

export { SysUser };