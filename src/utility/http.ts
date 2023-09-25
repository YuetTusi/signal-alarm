import url from 'url';
import http from 'http';
import { helper } from '@/utility/helper';
import { StorageKeys } from './storage-keys';

const { ip, port } = helper.getAppSetting();

/**
 * 封装HTTP请求
 */
class HttpRequest {

    private _baseUrl = ''

    constructor() {
        this._baseUrl = `http://${ip}:${port}`;
    }

    _getFetchUrl(requestUrl: string) {
        const PREFIX = /^https?:.+/;
        if (PREFIX.test(requestUrl)) {
            return requestUrl;
        } else if (requestUrl.startsWith('/')) {
            return this._baseUrl + requestUrl;
        } else {
            return this._baseUrl + '/' + requestUrl;
        }
    }

    _request<T = any>(fetchUrl: string, parameters?: Record<string, any>, method: string = 'POST'): Promise<null | RequestResult<T>> {

        // console.log(`${method} ${fetchUrl} 参数:${JSON.stringify(parameters)}`);
        const options = url.parse(this._getFetchUrl(fetchUrl));
        let data = '';

        return new Promise((resolve, reject) => {
            const req = http.request({
                host: options.hostname,
                port: options.port,
                path: options.path,
                timeout: 1000 * 30,
                method,
                headers: {
                    'Content-Type': 'application/json;charset=utf8',
                    'token': sessionStorage.getItem(StorageKeys.Token) ?? ''
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
            req.on('error', (e) => reject(e));
            if (parameters !== undefined) {
                req.write(JSON.stringify(parameters));
            }
            req.end();
        });
    }
    /**
     * GET请求
     * @param fetchUrl URL
     */
    get<T = any>(fetchUrl: string): Promise<null | RequestResult<T>> {
        console.log(`GET ${fetchUrl}`);
        const options = url.parse(this._getFetchUrl(fetchUrl));
        let data = '';
        return new Promise((resolve, reject) => {
            const req = http.get({
                ...options,
                headers: {
                    'Content-Type': 'application/json;charset=utf8',
                    'token': sessionStorage.getItem(StorageKeys.Token) ?? ''
                }
            }, (res) => {
                res.setEncoding('utf-8');
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    // console.log(`GET ${fetchUrl} Response: ${data}`);
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
                res.on('error', err => {
                    reject(err);
                });
            });
            req.end();
        });
    }
    /**
     * POST请求
     * @param fetchUrl URL
     * @param parameters 参数
     */
    post<T = any>(fetchUrl: string, parameters?: Record<string, any>) {
        console.log(`POST ${fetchUrl}, 参数:${JSON.stringify(parameters)}`);
        return this._request<T>(fetchUrl, parameters, 'POST');
    }
    /**
     * PUT请求
     * @param fetchUrl URL
     * @param parameters 参数
     */
    put<T = any>(fetchUrl: string, parameters?: Record<string, any>) {
        console.log(`PUT ${fetchUrl}, 参数:${JSON.stringify(parameters)}`);
        return this._request<T>(fetchUrl, parameters, 'PUT');
    }
    /**
     * DELETE请求
     * @param fetchUrl URL
     * @param parameters 参数
     */
    del<T = any>(fetchUrl: string, parameters?: Record<string, any>) {
        console.log(`DELETE ${fetchUrl}, 参数:${JSON.stringify(parameters)}`);
        return this._request<T>(fetchUrl, parameters, 'DELETE');
    }
    /**
     * 文件
     * @param fetchUrl URL
     */
    attachment(fetchUrl: string): Promise<Buffer> {
        const options = url.parse(this._getFetchUrl(fetchUrl));

        let data = Buffer.alloc(0);

        return new Promise((resolve, reject) => {

            const req = http.get({
                ...options,
                headers: {
                    'token': sessionStorage.getItem(StorageKeys.Token) ?? ''
                }
            }, (res) => {
                res.on('data', chunk => {
                    data = Buffer.concat([data, chunk]);
                });
                res.on('end', () => {
                    resolve(data);
                });
                res.on('error', (error) => {
                    reject(error);
                });
            });
            req.end();
        });
    }
}

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

const request = new HttpRequest();

export { request, HttpRequest, type RequestResult };