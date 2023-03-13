
import url from 'url';
import http from 'http';
import { helper } from '@/utility/helper';

const baseUrl = 'http://58.48.76.202:18800';

interface RequestResult<T = any> {
    /**
     * 状态码（200成功）
     */
    code: number,
    /**
     * 消息
     */
    message: string,
    /**
     * 响应结果
     */
    data: T
}

/**
 * 返回完整请求URL
 * @param requestUrl 请求URL
 */
const getFetchUrl = (requestUrl: string) => {

    const PREFIX = /^https?:.+/;
    if (PREFIX.test(requestUrl)) {
        return requestUrl;
    } else if (requestUrl.startsWith('/')) {
        return baseUrl + requestUrl;
    } else {
        return baseUrl + '/' + requestUrl;
    }
};

/**
 * 发送GET请求
 * @param fetchUrl 请求URL
 */
function httpGet<T = any>(fetchUrl: string): Promise<null | RequestResult<T>> {

    const options = url.parse(getFetchUrl(fetchUrl));
    let data = '';

    return new Promise((resolve, reject) => {
        const req = http.get({
            ...options,
            headers: {
                'Content-Type': 'application/json;charset=utf8'
            }
        }, (res) => {
            res.setEncoding('utf-8');
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    if (helper.isNullOrUndefined(data) || data === '') {
                        resolve(null);
                    } else {
                        resolve(JSON.parse(data));
                    }
                } catch (error) {
                    reject(error);
                }
            });
            res.on('error', err => reject(err));
        });
        req.end();
    });
};

/**
 * 发送POST请求
 * @param fetchUrl 请求URL
 */
function httpPost<T = any>(fetchUrl: string, parameters?: Record<string, any>): Promise<null | RequestResult<T>> {

    console.log(getFetchUrl(fetchUrl));
    const options = url.parse(getFetchUrl(fetchUrl));
    let data = '';

    return new Promise((resolve, reject) => {
        const req = http.request({
            host: options.hostname,
            port: options.port,
            path: options.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf8'
            }
        }, (res) => {
            res.setEncoding('utf-8');
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    if (data === '') {
                        resolve(null);
                    } else {
                        resolve(JSON.parse(data));
                    }
                } catch (error) {
                    reject(error);
                }
            });
            res.on('error', err => reject(err));
        });
        req.on('error', (e) => console.log(e));
        if (parameters !== undefined) {
            req.write(JSON.stringify(parameters));
        }
        req.end();
    });
};

export { httpGet, httpPost, type RequestResult };