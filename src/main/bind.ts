import { BrowserWindow, IpcMainEvent, ipcMain, dialog } from 'electron';
import { logger } from '../utility/log';

/**
 * 绑定主进程handle
 * @param win 主窗口句柄
 */
const bindHandle = (win: BrowserWindow) => {

    //打开系统对话框
    ipcMain.handle('open-dialog', (_, options) => dialog.showOpenDialog(options));

    ipcMain.handle('log', (_, content: string, level: 'info' | 'debug' | 'warn' | 'error') => {

        logger[level](content);
    });
};

export { bindHandle };