import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dayjs from "dayjs";
import memoize from 'lodash/memoize';
import { v4 } from 'uuid';

const { join } = path;
const { access, readFile, writeFile } = fs.promises;
const cwd = process.cwd();

/**
* 接口默认IP
*/
const FETCH_IP = '58.48.76.202';
/**
 * 接口默认端口
 */
const FETCH_PORT = 18800;

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
     * 写JSON文件
     * @param filePath 文件位置
     * @param data 内容
     */
    async writeJson(filePath: string, data: string | Record<string, any>) {
        let content: any = null;
        if (typeof data !== 'string') {
            try {
                content = JSON.stringify(data);
            } catch (error) {
                return false;
            }
        } else {
            content = data;
        }
        try {
            await writeFile(filePath, content, { encoding: 'utf-8' });
            return true;
        } catch (error) {
            return false;
        }
    },
    /**
     * 读JSON文件
     * @param filePath 文件位置
     */
    async readJson(filePath: string): Promise<Record<string, any>> {
        try {
            const data = await readFile(filePath, { encoding: 'utf-8' });
            return JSON.parse(data);
        } catch (error) {
            throw error;
        }
    },
    /**
     * 读取通讯接口IP和端口号
     */
    getFetchIp: memoize(() => {
        const ipJson = process.env['NODE_ENV'] === 'development'
            ? join(cwd, './ip.json')
            : join(cwd, 'resources/ip.json');
        try {
            const data = fs.readFileSync(ipJson, { encoding: 'utf-8' });
            const json = JSON.parse(data) as { ip: string, port: number };
            console.info(`当前接口IP&端口:${json?.ip ?? FETCH_IP}:${json?.port ?? FETCH_PORT}`);
            return { ip: json?.ip ?? FETCH_IP, port: json?.port ?? FETCH_PORT };
        } catch (error) {
            console.warn(`读取ip.json失败: ${error.message}, 使用默认IP配置`);
            return { ip: FETCH_IP, port: FETCH_PORT };
        }
    }),
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

export { FETCH_IP, FETCH_PORT };
export { helper };