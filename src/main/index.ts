import { join } from 'path';
import { mkdirSync, accessSync, readFileSync } from 'fs';
import {
    app, BrowserWindow, globalShortcut, ipcMain, IpcMainEvent
} from 'electron';
import { init } from './init';
import { port } from '../../config/port';
import { AppMode, Conf } from '../schema/conf';
import { bindHandle, bindListener } from './bind';

const cwd = process.cwd();
const { env, resourcesPath } = process;
const isDev = env['NODE_ENV'] === 'development';
// const isLinux = platform === 'linux';
var conf: Conf = { mode: 0, alarmType: 0 };
var mainWindow: BrowserWindow | null = null;
var reportWindow: BrowserWindow | null = null;
var timerWindow: BrowserWindow | null = null;

app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('disable-gpu-rasterization');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('--no-sandbox');
app.disableHardwareAcceleration();

if (!app.requestSingleInstanceLock()) {
    app.quit();
}

(async () => {
    try {
        accessSync(join(cwd, './logs'));
    } catch (error) {
        mkdirSync(join(cwd, './logs'));
    }
    try {
        const confPath = isDev
            ? join(cwd, './setting/conf.json')
            : join(cwd, 'resources/conf.json');
        accessSync(confPath);
        const chunk = readFileSync(confPath, { encoding: 'utf8' });
        conf = JSON.parse(chunk) as Conf;
    } catch (_) {
        conf = { mode: 0, alarmType: 0 };
    }

    await init(isDev);

    // if (!isDev) {
    //     globalShortcut.register('Control+R', () => {
    //         if (mainWindow && mainWindow.isFocused()) {
    //             return false;
    //         }
    //     });
    //     globalShortcut.register('CommandOrControl+Shift+I', () => {
    //         if (mainWindow && mainWindow.isFocused()) {
    //             return false;
    //         }
    //     });
    // }
})();

app.on('second-instance', (_, commandLine, workingDirectory) => {
    //单例应用
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.focus();
        mainWindow.show();
    }
});

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        title: '文档生成',
        width: conf.mode === AppMode.PC ? 1660 : 1920,
        height: conf.mode === AppMode.PC ? 900 : 1080,
        minWidth: conf.mode === AppMode.PC ? 1660 : 1920,
        minHeight: conf.mode === AppMode.PC ? 900 : 1080,
        show: true,
        frame: false,
        fullscreen: conf.mode === AppMode.FullScreen,
        backgroundColor: '#02002f',
        webPreferences: {
            javascript: true,
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            sandbox: false, // 禁用沙箱模式
            additionalArguments: ['--no-sandbox'] // 增加 --no-sandbox 参数
        }
    });
    timerWindow = new BrowserWindow({
        title: 'timer',
        width: 1440,
        height: 900,
        minHeight: 800,
        minWidth: 1440,
        show: false,
        webPreferences: {
            javascript: true,
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    });

    // mainWindow.setMenu(null);
    mainWindow.maximize();

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        //拦截renderer的window.open，将blob开头的pdf请求窗口隐藏菜单
        if (url.startsWith('blob:')) {
            return {
                action: 'allow',
                overrideBrowserWindowOptions: {
                    title: '检查报告',
                    width: 1440,
                    height: 900,
                    autoHideMenuBar: true,
                    sandbox: false, // 禁用沙箱模式
                    additionalArguments: ['--no-sandbox'] // 增加 --no-sandbox 参数
                }
            };
        } else {
            return { action: 'deny' };
        }
    });

    if (isDev) {
        mainWindow.loadURL(`http://127.0.0.1:${port.dev}/`);
        mainWindow.webContents.openDevTools();
        timerWindow.loadFile('src/renderer/timer/timer.html');
        timerWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(join(resourcesPath, 'app.asar.unpacked/dist/index.html'));
        timerWindow.loadFile(join(resourcesPath, 'app.asar.unpacked/src/renderer/timer/timer.html'));
    }
    bindHandle(mainWindow);
    bindListener(mainWindow);

    mainWindow.on('closed', () => {

        if (reportWindow) {
            reportWindow.destroy();
        }
        if (timerWindow) {
            timerWindow.destroy();
        }
    });

});

//窗口关闭
ipcMain.on('close', (event: IpcMainEvent) => {
    event.preventDefault();
    if (reportWindow) {
        reportWindow.close();
    }
    if (timerWindow) {
        timerWindow.close();
    }
    if (mainWindow) {
        mainWindow.close();
    }
});
//退出应用
ipcMain.on('do-close', (_: IpcMainEvent) => {
    //mainWindow通知退出程序
    if (reportWindow) {
        reportWindow.close();
        reportWindow.destroy();
    }
    if (timerWindow) {
        timerWindow.close();
        timerWindow.destroy();
    }
    if (mainWindow) {
        mainWindow.destroy();
    }
    app.exit(0);
});

/**
 * 重启应用
 */
ipcMain.on('do-relaunch', () => {
    app.relaunch();
    globalShortcut.unregisterAll();
    if (reportWindow && !reportWindow.isDestroyed()) {
        reportWindow.destroy();
        reportWindow = null;
    }
    if (timerWindow && !timerWindow.isDestroyed()) {
        timerWindow.destroy();
        timerWindow = null;
    }
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.destroy();
    }
    app.exit(0);
});

app.on('window-all-closed', () => {

    if (reportWindow && !reportWindow.isDestroyed()) {
        reportWindow.destroy();
        reportWindow = null;
    }
    if (timerWindow && !timerWindow.isDestroyed()) {
        timerWindow.destroy();
    }
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.destroy();
    }
    app.exit(0);
});