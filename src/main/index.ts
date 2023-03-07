import { join } from 'path';
import { app, BrowserWindow, globalShortcut } from 'electron';
import { bindHandle } from './bind';

const isDev = process.env['NODE_ENV'] === 'development';
var mainWindow: BrowserWindow | null = null;

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

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        title: '文档生成',
        width: 1280,
        height: 900,
        minHeight: 600,
        minWidth: 1280,
        show: true,
        frame: false,
        webPreferences: {
            javascript: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.setMenu(null);

    if (isDev) {
        mainWindow.loadURL('http://127.0.0.1:4000/');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(join(__dirname, 'index.html'));
    }

    bindHandle(mainWindow);
});


app.on('window-all-closed', () => {

    if (mainWindow) {
        mainWindow.destroy();
    }

    app.exit(0);
});
