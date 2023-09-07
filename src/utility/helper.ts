import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import electron from 'electron';
import dayjs from "dayjs";
import { v4 } from 'uuid';
import memoize from 'lodash/memoize';
import { Protocol } from '@/schema/protocol';
import { ComDevice, ComDeviceDropdown } from '@/schema/com-device';

const { join } = path;
const { access, readFile, writeFile } = fs.promises;
const cwd = process.cwd();
const { ipcRenderer } = electron;

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
    },
    protocolToString(protocol: Protocol[]) {
        return protocol.join(',');
    },
    /**
     * 写入日志
     * @param value 日志内容 
     * @param level 日志等级
     */
    log(value: string, level: 'info' | 'debug' | 'warn' | 'error' = 'info') {
        ipcRenderer.send('log', value, level);
    },
    /**
     * 转为设备下拉数据（以场所树型显示）
     * @param devices 设备数据
     */
    toDeviceDropdown(devices: ComDevice[]) {
        let set = new Set(devices.map(i => i.siteName));
        let data: ComDeviceDropdown[] = [];
        if (devices.length === 0) {
            return [];
        }
        for (let [k, v] of set.entries()) {
            const devInSite = devices.filter(i => i.siteName === v);
            if (devInSite.length !== 0) {
                data.push({
                    title: v ?? '-',
                    value: JSON.stringify({ type: 'site', deviceId: devInSite.map(i => i.deviceId) }),
                    children: devInSite.map(j => ({
                        title: j.deviceName,
                        value: JSON.stringify({ type: 'device', deviceId: [j.deviceId] }),
                        deviceId: j.deviceId
                    }))
                });
            }
        }
        return [{
            title: '全部',
            value: JSON.stringify({ type: 'all', deviceId: [] }),
            children: data
        }];
    },
    /**
     * 返回用户勾选的设备id
     * @param site 场所下拉数据
     */
    getDeviceIdFromDropdown(site: string[]) {
        let deviceId: string | undefined = undefined;
        try {
            if (site.length === 0) {
                deviceId = undefined;
            } else if (site.length === 1) {
                const data: {
                    type: string,
                    deviceId: string[]
                } = JSON.parse(site[0]);
                if (data.type === 'all') {
                    deviceId = undefined;
                } else {
                    //只选了一个节点，但不是全部
                    deviceId = data.deviceId.join(',');
                }
            } else {
                //选了多个节点，需要把所有的deviceId展开并去重
                const idList = site.reduce((acc, current) => {
                    const data: {
                        type: string,
                        deviceId: string[]
                    } = JSON.parse(current);
                    return acc.concat(...data.deviceId);
                }, [] as string[]);
                deviceId = [...new Set(idList)].join(',');
            }
        } catch (error) {
            throw error;
        }
        return deviceId;
    }
};

export { FETCH_IP, FETCH_PORT };
export { helper };