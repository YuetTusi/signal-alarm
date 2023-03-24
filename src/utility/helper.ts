import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dayjs from "dayjs";
import { v4 } from 'uuid';

const { join } = path;
const { access } = fs.promises;
const cwd = process.cwd();

const helper = {
    /**
     * 是否为开发模式
     */
    IS_DEV: process.env['NODE_ENV'] === 'development',
    /**
     * 服务端SSE通信地址
     */
    SSE_URL: 'http://58.48.76.202:18800',
    /**
     * 默认分页尺寸
     */
    PAGE_SIZE: 10,
    /**
     * @description 转为dayjs日期格式
     * @param date 原日期字串
     * @param format 格式化字串 默认年-月-日
     * @returns Moment实例
     */
    parseDate: (date: string, format: string = 'YYYY-MM-DD') => dayjs(date, format),
    /**
     * @description 是否是null或undefined
     * @param val 任意值
     */
    isNullOrUndefined: (val: any) => (val === undefined || val === null),
    /**
     * 新id 
     */
    nextId: (size = 16) => {
        return v4().replaceAll('-', '').substring(0, size);
    },
    /**
     * 验证文件是否存在
     * @param filePath 文件路径
     * @returns {Promise<boolean>} true为存在
     */
    async existFile(filePath: string) {
        try {
            await access(filePath);
            return true;
        } catch (error) {
            console.warn(error.message);
            return false;
        }
    },
    /**
     * 是否处于调试模式
     */
    async isDebug() {
        try {
            const exist = await this.existFile(join(cwd, './debug'));
            return exist;
        } catch (error) {
            console.warn(error.message);
            return false;
        }
    },
    /**
     * 使用MD5生成哈希值
     * @param val 字串
     */
    md5(val: string) {
        const md5 = crypto.createHash('md5');
        return md5.update(val).digest('hex');
    }
};

export { helper };