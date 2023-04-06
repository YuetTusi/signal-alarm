import { BaseEntity } from './base-entity';

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
     * 开始时间
     */
    startTime: number | null = null
    /**
     * 结束时间
     */
    endTime: number | null = null

    constructor() {
        super();
    }
}

export { QuickCheckReport };