import { BrowserWindow, IpcMainEvent, ipcMain, dialog } from 'electron';

/**
 * 绑定主进程handle
 * @param win 主窗口句柄
 */
const bindHandle = (win: BrowserWindow) => {

    //窗口最小化
    ipcMain.on('minimize', (event: IpcMainEvent) => {
        event.preventDefault();
        win.minimize();
    });

    //窗口最大化
    ipcMain.on('maximize', (event: IpcMainEvent) => {

        event.preventDefault();
        win.isMaximized() ? win.restore() : win.maximize();
    });

    //窗口关闭
    ipcMain.on('close', (event: IpcMainEvent) => {
        event.preventDefault();
        win.close();
    });

    //打开系统对话框
    ipcMain.handle('open-dialog', (event, options) => dialog.showOpenDialog(options));
};

export { bindHandle };