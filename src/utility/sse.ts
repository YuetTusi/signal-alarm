import { helper } from './helper';
import { request } from "./http";
import { StorageKeys } from "./storage-keys";

const { port, ip } = helper.getAppSetting();
let source: EventSource | null = null;

/**
 * 创建SSE实例绑定onMessage回调
 */
const instance = (onMessage: (this: EventSource, ev: MessageEvent<any>) => any) => {

    const userId = sessionStorage.getItem(StorageKeys.UserId)!;
    const hash = sessionStorage.getItem(StorageKeys.MsgKey)!;

    if (source === null) {
        source = new EventSource(
            `http://${ip}:${port}/sse/connect?userId=${userId}&hash=${hash}`
        );

        source.addEventListener('open', () => {
            console.log('SSE open');
        });

        source.addEventListener('message', onMessage);

        source.addEventListener('error', (event) => {
            console.log('SSE error: ', event);
        });
    }

    return source;
};

/**
 * 关闭SSE释放资源
 */
const closeSse = () => {
    if (source) {
        const hash = sessionStorage.getItem(StorageKeys.Hash) ?? '';
        console.log(`SSE close ${hash}`);
        source.close();
        request.get(`/sse/close?hash=${hash}`);
        source = null;
    }
};

export { instance, closeSse };