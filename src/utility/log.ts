import dayjs from 'dayjs';
import fs, { WriteStream } from 'fs';
import path from 'path';

const cwd = process.cwd();
const { join } = path;

class Log {

    ws: WriteStream | null = null

    constructor(filePath: string) {
        if (this.ws === null) {
            this.ws = fs.createWriteStream(filePath, {
                encoding: 'utf8',
                flags: 'a',
                autoClose: true
            });
        }
    }
    debug(value: string) {
        if (this.ws) {
            const tpl = `[${dayjs().format('YYYY/MM/DD HH:mm:ss')}][DEBUG]: ${value}\r\n`;
            this.ws.write(tpl);
        }
    }
    info(value: string) {
        if (this.ws) {
            const tpl = `[${dayjs().format('YYYY/MM/DD HH:mm:ss')}][INFO]: ${value}\r\n`;
            this.ws.write(tpl);
        }
    }
    warn(value: string) {
        if (this.ws) {
            const tpl = `[${dayjs().format('YYYY/MM/DD HH:mm:ss')}][WARN]: ${value}\r\n`;
            this.ws.write(tpl);
        }
    }
    error(value: string) {
        if (this.ws) {
            const tpl = `[${dayjs().format('YYYY/MM/DD HH:mm:ss')}][ERROR]: ${value}\r\n`;
            this.ws.write(tpl);
        }
    }
}

const log = new Log(join(cwd, './logs/app.log'));

export { log };