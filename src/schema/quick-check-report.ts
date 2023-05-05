import { BaseEntity } from './base-entity';

/**
 * 检测报告
 */
class QuickCheckReport extends BaseEntity {

    /**
     * 报告id
     */
    reportId: string | null = null
    /**
     * 任务id
     */
    taskId: string = ''
    /**
     * 开始时间(unix时间戳)
     */
    startTime: number | null = null
    /**
     * 结束时间(unix时间戳)
     */
    endTime: number | null = null
    /**
     * 报告PDF下载地址
     */
    url: string = ''
}

export { QuickCheckReport };