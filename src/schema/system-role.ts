import { BaseEntity } from "./base-entity";

/**
 * 角色
 */
export interface SystemRole extends BaseEntity {
    /**
     * 角色代码
     */
    roleCode: string,
    /**
     * 角色名称
     */
    roleName: string,
    /**
     * 描述
     */
    description: string
}

