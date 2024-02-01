import { FC, MouseEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Select, Form, Table } from 'antd';
import { SearchBar, SysUserBox, TableBox } from './styled/box';
import useModel from '@/model';
import { SystemUser } from '@/schema/system-user';
import { getColumns } from './column';
import { ColumnAction, SearchFormValue } from './prop';

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * 用户管理
 */
const SysUser: FC<{}> = () => {

    const navigate = useNavigate();
    const [formRef] = useForm<SearchFormValue>();
    const {
        sysRoleList,
        sysUserData,
        sysUserLoading,
        sysUserPageIndex,
        sysUserPageSize,
        sysUserTotal,
        querySysRoleList,
        querySysUserData
    } = useModel(state => ({
        sysRoleList: state.sysRoleList,
        sysUserData: state.sysUserData,
        sysUserLoading: state.sysUserLoading,
        sysUserPageIndex: state.sysUserPageIndex,
        sysUserPageSize: state.sysUserPageSize,
        sysUserTotal: state.sysUserTotal,
        querySysRoleList: state.querySysRoleList,
        querySysUserData: state.querySysUserData,
    }));

    useEffect(() => {
        querySysRoleList();
        querySysUserData(1, 15);
    }, []);

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

    const onGoBackClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        navigate('/dashboard');
    };

    const onPageChange = async (pageIndex: number, pageSize: number) => {
        const { getFieldsValue } = formRef;
        const { keyword, roleId } = getFieldsValue();
        try {
            await querySysUserData(pageIndex, pageSize, { keyword, roleId });
        } catch (error) {
            console.warn(error);
        }
    };

    const columnClick = (type: ColumnAction, data: SystemUser) => {

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
                                <Option value={-1}>全部</Option>,
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
            <div></div>
        </SearchBar>
        <TableBox>
            <Table<SystemUser>
                columns={getColumns(columnClick)}
                dataSource={sysUserData}
                loading={sysUserLoading}
                rowKey="id"
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
    </SysUserBox>;
};

export { SysUser };