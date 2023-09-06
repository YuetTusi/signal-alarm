import { join } from 'path';
import { access, mkdir, writeFile } from 'fs/promises';

const cwd = process.cwd();

const init = async (isDev: boolean) => {

    if (!isDev) {
        try {
            await access(join(cwd, './resources/ip.json'));
        } catch (error) {
            await writeFile(
                join(cwd, './resources/ip.json'),
                JSON.stringify({ ip: '58.48.76.202', port: 18800 }),
                { encoding: 'utf-8' }
            );
        }
    }

    try {
        await access('C:/_signal_tmp');
    } catch (error) {
        await mkdir('C:/_signal_tmp');
    }
};

export { init };