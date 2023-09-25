import { BaseEntity } from "./base-entity";

/**
 * 中间库
 */
export interface Middle extends BaseEntity {

    middleId: string,
    middleName: string,
    middleType: number,
    description: string,
    term: string,
    keywordType: number,
    createId: number,
    createDeptId: number,
    createDeptName: string,
    createIds: string
}
