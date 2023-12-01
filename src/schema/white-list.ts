import { BaseEntity } from "./base-entity";

/**
 * 类型
 */
enum WhiteListType {
    /**
     * Mac
     */
    MAC = 1,
    /**
     * 频段
     */
    Freq = 2
}

/**
 * 白名单
 */
class WhiteList extends BaseEntity {

    ruleType: WhiteListType = WhiteListType.MAC

    ruleName: string = ''

    ruleData: string = ''

    status: number = 0
}


export { WhiteList, WhiteListType };