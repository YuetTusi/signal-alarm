import { join } from 'path';
import { access, mkdir, writeFile } from 'fs/promises';

const cwd = process.cwd();

const init = async (isDev: boolean) => {

    if (process.platform === 'linux') {
        try {
            await access(join(cwd, './resources'));
        } catch (error) {
            await mkdir(join(cwd, './resources'), { mode: 0o777 });
        }
        if (!isDev) {
            try {
                await access(join(cwd, './resources/ip.json'));
            } catch (error) {
                await writeFile(
                    join(cwd, './resources/ip.json'),
                    JSON.stringify({ appName: '无线信号哨兵长时监测系统', ip: '58.48.76.202', port: 18800 }),
                    { encoding: 'utf-8' }
                );
            }
        }
    }
};

export { init };