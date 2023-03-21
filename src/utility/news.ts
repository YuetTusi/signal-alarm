import events from 'events';
import { helper } from '@/utility/helper';

const { EventEmitter } = events;
const { SSE_URL } = helper;

/**
 * 接受服务端消息推送
 * 基于SSE单工通信
 */
class News extends EventEmitter {

    private source: EventSource;

    constructor(url: string) {

        super();
        const dst = url ?? SSE_URL;
        this.source = new EventSource(dst);
        this.source.addEventListener('open', (event) => {
            this.emit('open', event);
        });
        this.source.addEventListener('message', this.message);
        this.source.addEventListener('error', (error) => this.emit('error', error));
    }

    message(event: MessageEvent) {
        this.emit('message', event, event.data);
    }

    close() {
        if (this.source) {
            this.source.close();
            this.emit('closed');
        }
    }
}

export { News };