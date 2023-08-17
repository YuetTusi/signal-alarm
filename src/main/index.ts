import { access, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { app, BrowserWindow, globalShortcut, ipcMain, IpcMainEvent } from 'electron';
import { port } from '../../config/port';
import { bindHandle } from './bind';

const cwd = process.cwd();
const { env, resourcesPath } = process;
const isDev = env['NODE_ENV'] === 'development';
var mainWindow: BrowserWindow | null = null;
var reportWindow: BrowserWindow | null = null;

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
    await app.whenReady();
    if (!isDev) {
        // globalShortcut.register('Control+R', () => {
        //     if (mainWindow && mainWindow.isFocused()) {
        //         return false;
        //     }
        // });
        // globalShortcut.register('CommandOrControl+Shift+I', () => {
        //     if (mainWindow && mainWindow.isFocused()) {
        //         return false;
        //     }
        // });
        try {
            await access(join(cwd, './resources/ip.json'));
        } catch (error) {
            await writeFile(
                join(cwd, './resources/ip.json'),
                JSON.stringify({ ip: '58.48.76.202', port: 18800 }),
                { encoding: 'utf-8' });
        }
        try {
            await access(join(cwd, './_tmp'));
        } catch (error) {
            await mkdir(join(cwd, './_tmp'));
        }
    }
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
        width: 1440,
        height: 900,
        minHeight: 800,
        minWidth: 1440,
        show: true,
        frame: false,
        backgroundColor: '#02002f',
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
    } else {
        mainWindow.loadFile(join(resourcesPath, 'app.asar.unpacked/dist/index.html'));
    }
    bindHandle(mainWindow);
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
    if (reportWindow) {
        reportWindow.close();
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
    app.exit(0);
});

ipcMain.on('report', (_: IpcMainEvent, fileName: string) => {
    if (reportWindow === null) {
        reportWindow = new BrowserWindow({
            title: '查看报告',
            width: 1440,
            height: 900,
            minHeight: 800,
            minWidth: 1440,
            show: true,
            webPreferences: {
                javascript: true,
                nodeIntegration: true,
                contextIsolation: false,
                webSecurity: false
            }
        });
        reportWindow.once('closed', () => {
            if (reportWindow) {
                reportWindow.destroy();
            }
            reportWindow = null;
        });
        reportWindow.setMenu(null);
        reportWindow.loadFile(join(cwd, '_tmp', fileName));
    } else {
        console.log('reload');

        reportWindow.loadFile(join(cwd, '_tmp', fileName));
    }
});

app.on('window-all-closed', () => {
    if (reportWindow) {
        reportWindow.destroy();
        reportWindow = null;
    }
    if (mainWindow) {
        mainWindow.destroy();
    }
    app.exit(0);
});