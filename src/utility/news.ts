import events from 'events';
import { helper } from '@/utility/helper';
import { request } from './http';
import { StorageKeys } from './storage-keys';

const { EventEmitter } = events;
const { SSE_URL } = helper;

var handle: News | null = null;


/**
 * 接受服务端消息推送
 * 基于SSE单向通信
 */
class News extends EventEmitter {

    private source: EventSource;
    private dst: string = '';
    private userId: string = '';
    private hash: string = '';

    constructor(url?: string) {

        super();
        const dst = url ?? SSE_URL;
        const userId = sessionStorage.getItem(StorageKeys.UserId);
        const hash = sessionStorage.getItem(StorageKeys.Hash);
        if (userId === null || hash === null) {
            throw new Error('用户未登录或未知哈希值');
        }
        this.dst = dst;
        this.userId = userId!;
        this.hash = hash!;
        console.log(`${dst}/sse/connect?userId=${userId}&hash=${hash}`);
        this.source = new EventSource(`${dst}/sse/connect?userId=${userId}&hash=${hash}`);
        this.source.addEventListener('open', (event) => {
            super.emit('open', event);
        });
        this.source.addEventListener('message', this.message);
        this.source.addEventListener('error', (error) => super.emit('error', error));
    }

    message(event: MessageEvent) {
        super.emit('message', event, event.data);
    }
    async pushUser() {
        try {
            const res = await request.post(`${this.dst}/sse/push-user`, {
                userId: this.userId,
                hash: this.hash,
                message: ''
            });
            console.log(res);
        } catch (error) {
            throw error;
        }
    }

    async close() {
        try {
            if (this.source) {
                this.source.close();
                await request.get(`${this.dst}/sse/close?hash=${this.hash}`);
                console.log('SSE已关闭');
                super.emit('closed', { userId: this.userId, hash: this.hash });
                handle = null;
            }
        } catch (error) {
            throw error;
        }
    }
}

function instance(): News {
    if (handle === null) {
        handle = new News();
    }
    return handle;
}

export { instance, News };