
import url from 'url';
import http from 'http';
import forage from 'localforage';
import { helper } from '@/utility/helper';

/**
 * 封装HTTP请求
 */
class HttpRequest {

    private _baseUrl = ''

    constructor() {
        this._baseUrl = 'http://58.48.76.202:18800';
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

        const options = url.parse(this._getFetchUrl(fetchUrl));
        let data = '';

        return new Promise((resolve, reject) => {
            const req = http.request({
                host: options.hostname,
                port: options.port,
                path: options.path,
                method,
                headers: {
                    'Content-Type': 'application/json;charset=utf8',
                    'token': sessionStorage.getItem('token') ?? ''
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
    }

    /**
     * GET请求
     * @param fetchUrl URL
     */
    get<T = any>(fetchUrl: string): Promise<null | RequestResult<T>> {
        const options = url.parse(this._getFetchUrl(fetchUrl));
        let data = '';

        return new Promise((resolve, reject) => {
            const req = http.get({
                ...options,
                headers: {
                    'Content-Type': 'application/json;charset=utf8',
                    'token': sessionStorage.getItem('token') ?? ''
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
    }
    /**
     * POST请求
     * @param fetchUrl URL
     * @param parameters 参数
     */
    post<T = any>(fetchUrl: string, parameters?: Record<string, any>) {
        return this._request<T>(fetchUrl, parameters, 'POST');
    }
    /**
     * PUT请求
     * @param fetchUrl URL
     * @param parameters 参数
     */
    put<T = any>(fetchUrl: string, parameters?: Record<string, any>) {
        return this._request<T>(fetchUrl, parameters, 'PUT');
    }
    /**
     * DELETE请求
     * @param fetchUrl URL
     * @param parameters 参数
     */
    del<T = any>(fetchUrl: string, parameters?: Record<string, any>) {
        return this._request<T>(fetchUrl, parameters, 'DELETE');
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