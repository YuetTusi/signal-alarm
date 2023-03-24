import events from 'events';
import { helper } from '@/utility/helper';
import { request } from './http';

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
    private user: string = '';
    private hash: string = '';

    constructor(url?: string) {

        super();
        const dst = url ?? SSE_URL;
        const user = sessionStorage.getItem('user');
        const hash = sessionStorage.getItem('sh');
        if (user === null || hash === null) {
            throw new Error('用户未登录或未知哈希值');
        }
        this.dst = dst;
        this.user = user!;
        this.hash = hash!;
        this.source = new EventSource(`${dst}/sse/connect?userId=${user}&hash=${hash}`);
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
            const res = await request.post(`${this.dst}/sse/push-user`);
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
                super.emit('closed', { user: this.user, hash: this.hash });
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