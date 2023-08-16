import { access, writeFile } from 'fs/promises';
import { join } from 'path';
import { app, BrowserWindow, globalShortcut, ipcMain, IpcMainEvent } from 'electron';
import { port } from '../../config/port';
import { bindHandle } from './bind';

const cwd = process.cwd();
const { env, resourcesPath } = process;
const isDev = env['NODE_ENV'] === 'development';
var mainWindow: BrowserWindow | null = null;

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

//退出应用
ipcMain.on('do-close', (_: IpcMainEvent) => {
    //mainWindow通知退出程序
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
    app.exit(0);
});


app.on('window-all-closed', () => {
    if (mainWindow) {
        mainWindow.destroy();
    }

    app.exit(0);
});