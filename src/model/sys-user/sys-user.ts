import dayjs from 'dayjs';
import { message } from 'antd';
import { log } from '@/utility/log';
import { helper } from '@/utility/helper';
import { request } from '@/utility/http';
import { QueryPage } from '@/schema/query-page';
import { SystemUser } from '@/schema/system-user';
import { GetState, SetState } from "..";
import { SysUserState } from '.';

const sysUser = (setState: SetState, _: GetState): SysUserState => ({
    /**
    * 用户数据
    */
    sysUserData: [],
    /**
     * 页码
     */
    sysUserPageIndex: 1,
    /**
     * 页尺寸
     */
    sysUserPageSize: helper.PAGE_SIZE,
    /**
     * 总数
     */
    sysUserTotal: 0,
    /**
     * 读取中
     */
    sysUserLoading: false,
    /**
     * 查询用户数据
     */
    async querySysUserData(pageIndex: number, pageSize: number, condition?: Record<string, any>) {
        let params = '';
        if (!helper.isNullOrUndefined(condition)) {
            let q: string[] = [];
            if (condition?.keyword) {
                q.push(`keyword=${window.encodeURIComponent(condition?.keyword)}`);
            }
            if (condition?.roleId !== -1) {
                q.push(`roleId=${condition?.roleId}`);
            }
            params = '?' + q.join('&');
        }
        message.destroy();
        setState({ sysUserLoading: true });
        try {
            const res = await request.get<QueryPage<SystemUser>>(`/system/sysUser/${pageIndex}/${pageSize}${params}`);
            if (res === null || res.code !== 200) {
                throw new Error('查询失败');
            }

            if (pageIndex > res.data.pages) {
                let ret = await request.get<QueryPage<SystemUser>>(`/system/sysUser/${res.data.pages}/${pageSize}${params}`);
                if (ret === null || ret.code !== 200) {
                    throw new Error('查询失败');
                } else {
                    setState({
                        sysUserData: ret.data.records.sort((a, b) =>
                            dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                        sysUserPageIndex: pageIndex,
                        sysUserPageSize: pageSize,
                        sysUserTotal: ret.data.total
                    });
                }
            } else {
                setState({
                    sysUserData: res.data.records.sort((a, b) =>
                        dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()),
                    sysUserPageIndex: pageIndex,
                    sysUserPageSize: pageSize,
                    sysUserTotal: res.data.total
                });
            }
        } catch (error) {
            log.error(`查询用户失败@model/sys-user/querySysUserData:${error.message}`);
            message.warning(`查询失败（${error.message ?? ''}）`);
        } finally {
            setState({ sysUserLoading: false });
        }
    },
    /**
    * 添加用户
    */
    async addSysUser(payload: SystemUser) {
        const url: string = '/system/sysUser/save';
        try {
            const res = await request.post(url, payload);
            console.log(res);
            return res;
        } catch (error) {
            throw error;
        }
    },
    /**
     * 编辑用户
     */
    async updateSysUser(payload: SystemUser) {
        const url: string = '/system/sysUser/update';
        try {
            const res = await request.put(url, payload);
            return res;
        } catch (error) {
            throw error;
        }
    },
    /**
     * 修改密码
     */
    async modifySysUserPassword(id: number, newPassword: string, oldPassword: string) {
        const url: string = '/system/sysUser/update-password';
        try {
            const res = await request.post(url, { id, newPassword, oldPassword });
            return res;
        } catch (error) {
            throw error;
        }
    },
    /**
    * 修改状态
    */
    async modifySysUserStatus(id: number, status: number) {
        const url: string = `/system/sysUser/updateStatus/${id}/${status}`;
        try {
            const res = await request.get(url);
            return res;
        } catch (error) {
            throw error;
        }
    },
    /**
     * 删除用户
     */
    async delSysUser(id: number) {
        const url: string = `/system/sysUser/remove/${id}`;
        try {
            const res = await request.del(url);
            return res;
        } catch (error) {
            throw error;
        }
    }
});

export { sysUser };