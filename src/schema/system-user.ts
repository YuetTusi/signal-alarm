import { BaseEntity } from "./base-entity";

/**
 * 用户
 */
export interface SystemUser extends BaseEntity {
    /**
     * 用户名
     */
    username: string,
    /**
     * 密码（加密串）
     */
    password: string,
    /**
     * 姓名
     */
    name: string,
    /**
     * 手机
     */
    phone: string,
    /**
     * 头像URL
     */
    headUrl: string | null,
    /**
     * 部门Id
     */
    deptId: number,
    /**
     * 岗位id
     */
    postId: number,
    /**
     * 描述
     */
    description: string | null,
    /**
     * 状态（0:停用 1:正常）
     */
    status: number,
    /**
     * 角色
     */
    roleList: any,
    /**
     * 岗位
     */
    postName: string | null,
    /**
     * 部门
     */
    deptName: string | null
}

