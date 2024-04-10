import { BrowserWindow, ipcMain, dialog, IpcMainEvent } from 'electron';

/**
 * 绑定主进程handle
 * @param win 主窗口句柄
 */
const bindHandle = (_: BrowserWindow) => {
    //打开系统对话框
    ipcMain.handle('open-dialog', (_, options) => dialog.showOpenDialog(options));
};

const bindListener = (win: BrowserWindow) => {

    //窗口最小化
    ipcMain.on('minimize', (event: IpcMainEvent) => {
        event.preventDefault();
        if (win && !win.isDestroyed()) {
            win.minimize();
        }
    });

    //窗口最大化
    ipcMain.on('maximize', (event: IpcMainEvent) => {
        event.preventDefault();
        if (win && !win.isDestroyed()) {
            win.isMaximized() ? win.restore() : win.maximize();
        }
    });

    ipcMain.on('query-special-type-statis', (_: IpcMainEvent) => {
        if (win && !win.isDestroyed()) {
            win.webContents.send('query-special-type-statis');
        }
    });

    ipcMain.on('query-each-1', (_: IpcMainEvent) => {
        if (win && !win.isDestroyed()) {
            win.webContents.send('query-each-1');
        }
    });

    ipcMain.on('query-each-5', (_: IpcMainEvent) => {
        if (win && !win.isDestroyed()) {
            win.webContents.send('query-each-5');
        }
    });

    ipcMain.on('query-each-10', (_: IpcMainEvent) => {
        if (win && !win.isDestroyed()) {
            win.webContents.send('query-each-10');
        }
    });

    ipcMain.on('query-each-20', (_: IpcMainEvent) => {
        if (win && !win.isDestroyed()) {
            win.webContents.send('query-each-20');
        }
    });

    ipcMain.on('alarm-clean', (_: IpcMainEvent) => {
        if (win && !win.isDestroyed()) {
            win.webContents.send('alarm-clean');
        }
    });

    ipcMain.on('alarm-drop-all', (_: IpcMainEvent) => {
        if (win && !win.isDestroyed()) {
            win.webContents.send('alarm-drop-all');
        }
    });

    ipcMain.on('log', (_, content: string, level: 'info' | 'debug' | 'warn' | 'error') => {

        console.log('log in Main', content, level);
    });

    ipcMain.on('reload', (_: IpcMainEvent) => {
        if (win && !win.isDestroyed()) {
            win.webContents.reload();
        }
    });
};

export { bindHandle, bindListener };