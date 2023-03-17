/**
 *  HTTP动词
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'TRACE';

const baseUrl = 'http://58.48.76.202:18800/';

interface RequestResult<T> {
    /**
     * 状态0:成功,非0失败
     */
    code: number,
    /**
     * 请求结果
     */
    data: T,
    /**
     * 消息
     */
    message: string
}

/**
 * 发送HTTP请求
 * @param url 请求URL地址
 * @param method HTTP方法
 * @param data 参数
 */
function request<T = any>(url: string, method: HttpMethod = 'GET', data?: Record<string, any> | null): Promise<RequestResult<T>> {

    let parameter: any = void 0;
    let fetchUrl = url;

    try {

        if (!/^(\/|https?:).+/.test(url)) {
            fetchUrl = baseUrl + url;
        }

        if (typeof data === 'string') {
            parameter = data;
        } else {
            parameter = JSON.stringify(data);
        }
    } catch (error) {
        console.log('Convert to JSON failure', error);
        parameter = data;
    }

    let baseOptions: RequestInit = {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: parameter
    }

    return new Promise<RequestResult<T>>((resolve, reject) => {
        return fetch(fetchUrl, {
            ...baseOptions,
            method
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                reject(new Error(`HTTP Status ${res.status}`));
            }
        }).then((data) => {
            resolve(data);
        }).catch(err => reject(err));
    });
}

export type { RequestResult };
export { request };