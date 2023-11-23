import { mkdirSync, accessSync, readFileSync } from 'fs';
import { join } from 'path';
import {
    app, BrowserWindow, globalShortcut, ipcMain, IpcMainEvent
} from 'electron';
import { init } from './init';
import { port } from '../../config/port';
import { bindHandle } from './bind';
// import { helper } from '../utility/helper';
import { AppMode, Conf } from '../schema/conf';

const cwd = process.cwd();
const { env, resourcesPath, platform } = process;
const isDev = env['NODE_ENV'] === 'development';
const isLinux = platform === 'linux';
var conf: Conf = { mode: 0, alarmType: 0 };
var mainWindow: BrowserWindow | null = null;
var reportWindow: BrowserWindow | null = null;
var reportWindows: BrowserWindow[] = [];
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
            ? join(cwd, './conf.json')
            : join(cwd, 'resources/conf.json');
        accessSync(confPath);
        const chunk = readFileSync(confPath, { encoding: 'utf8' });
        conf = JSON.parse(chunk) as Conf;
    } catch (error) {
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

app.on('second-instance', (event, commandLine, workingDirectory) => {
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
        height: conf.mode === AppMode.PC ? 900 : 1200,
        minHeight: conf.mode === AppMode.PC ? 800 : 1200,
        minWidth: conf.mode === AppMode.PC ? 1660 : 1920,
        show: true,
        frame: false,
        fullscreen: conf.mode === AppMode.FullScreen,
        backgroundColor: '#02002f',
        webPreferences: {
            javascript: true,
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
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

    mainWindow.on('closed', () => {

        reportWindows.forEach(win => {
            if (win && !win.isDestroyed()) {
                win.destroy();
            }
        });
        if (reportWindow) {
            reportWindow.destroy();
        }
        if (timerWindow) {
            timerWindow.destroy();
        }
    });

});

//窗口最小化
ipcMain.on('minimize', (event: IpcMainEvent) => {
    event.preventDefault();
    mainWindow!.minimize();
});

//窗口最大化
ipcMain.on('maximize', (event: IpcMainEvent) => {

    event.preventDefault();
    mainWindow!.isMaximized() ? mainWindow!.restore() : mainWindow!.maximize();
});

//窗口关闭
ipcMain.on('close', (event: IpcMainEvent) => {
    event.preventDefault();
    reportWindows.forEach(win => {
        if (win && !win.isDestroyed()) {
            win.close();
        }
    });
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

    reportWindows.forEach(win => {
        if (win && !win.isDestroyed()) {
            win.close();
            win.destroy();
        }
    });
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
    if (mainWindow) {
        mainWindow.destroy();
    }
    if (reportWindow) {
        reportWindow.destroy();
    }
    if (timerWindow) {
        timerWindow.destroy();
    }
    app.exit(0);
});

ipcMain.on('report', (_: IpcMainEvent, fileName: string) => {

    reportWindows.push(new BrowserWindow({
        title: '查看报告',
        width: 1440,
        height: 900,
        minHeight: 800,
        minWidth: 1440,
        show: true,
        autoHideMenuBar: true,
        webPreferences: {
            javascript: true,
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    }));

    reportWindows[reportWindows.length - 1]
        .loadFile(isLinux
            ? join(cwd, './_signal_tmp', fileName)
            : join('C:/_signal_tmp', fileName));
});

ipcMain.on('query-special-type-statis', (_: IpcMainEvent) => {
    if (mainWindow) {
        mainWindow.webContents.send('query-special-type-statis');
    }
});

ipcMain.on('query-wap', (_: IpcMainEvent) => {
    if (mainWindow) {
        mainWindow.webContents.send('query-wap');
    }
});

ipcMain.on('alarm-clean', (_: IpcMainEvent) => {
    if (mainWindow) {
        mainWindow.webContents.send('alarm-clean');
    }
});

ipcMain.on('alarm-drop-all', (_: IpcMainEvent) => {
    if (mainWindow) {
        mainWindow.webContents.send('alarm-drop-all');
    }
});

ipcMain.on('log', (_, content: string, level: 'info' | 'debug' | 'warn' | 'error') => {

    console.log('log in Main', content, level);
});

ipcMain.on('reload', (_: IpcMainEvent) => {
    if (mainWindow) {
        mainWindow.webContents.reload();
    }
});

app.on('window-all-closed', () => {

    reportWindows.forEach(win => {
        if (win && !win.isDestroyed()) {
            win.removeAllListeners();
            win.destroy();
        }
    });
    reportWindows = [];
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