import { BrowserWindow, ipcMain, dialog } from 'electron';

/**
 * 绑定主进程handle
 * @param win 主窗口句柄
 */
const bindHandle = (win: BrowserWindow) => {

    //打开系统对话框
    ipcMain.handle('open-dialog', (_, options) => dialog.showOpenDialog(options));
};

export { bindHandle };