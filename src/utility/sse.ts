import { request } from "./http";
import { StorageKeys } from "./storage-keys";


let source: EventSource | null = null;

const instance = (onMessage: (this: EventSource, ev: MessageEvent<any>) => any) => {

    const userId = sessionStorage.getItem(StorageKeys.UserId)!;
    const hash = sessionStorage.getItem(StorageKeys.Hash)!;

    if (source === null) {
        source = new EventSource(
            `http://58.48.76.202:18800/sse/connect?userId=${userId}&hash=${hash}`
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

const close = () => {
    if (source) {
        const hash = sessionStorage.getItem(StorageKeys.Hash) ?? '';
        console.log(`SSE close ${hash}`);
        source.close();
        request.get(`/sse/close?hash=${hash}`);
        source = null;
    }
};

export { instance, close };