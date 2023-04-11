import { join } from 'path';
import { app, BrowserWindow, globalShortcut } from 'electron';
import { port } from '../../config/port';
import { bindHandle } from './bind';

const { env, resourcesPath } = process;
const isDev = env['NODE_ENV'] === 'development';
var mainWindow: BrowserWindow | null = null;

if (!app.requestSingleInstanceLock()) {
    app.quit();
}

app.whenReady()
    .then(() => {
        // #生产模式屏蔽快捷键（发布把注释放开）
        if (!isDev) {
            globalShortcut.register('Control+R', () => {
                if (mainWindow && mainWindow.isFocused()) {
                    return false;
                }
            });
            globalShortcut.register('CommandOrControl+Shift+I', () => {
                if (mainWindow && mainWindow.isFocused()) {
                    return false;
                }
            });
        }
    });

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

app.on('window-all-closed', () => {
    if (mainWindow) {
        mainWindow.destroy();
    }

    app.exit(0);
});