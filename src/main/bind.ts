import { BrowserWindow, IpcMainEvent, ipcMain, dialog } from 'electron';

const bindHandle = (win: BrowserWindow) => {

    ipcMain.on('minimize', (event: IpcMainEvent) => {

        event.preventDefault();
        win.minimize();
    });

    ipcMain.on('maximize', (event: IpcMainEvent) => {

        event.preventDefault();
        win.isMaximized() ? win.restore() : win.maximize();
    });

    ipcMain.on('close', (event: IpcMainEvent) => {
        event.preventDefault();
        win.close();
    });

    ipcMain.handle('open-dialog', (event, options) => dialog.showOpenDialog(options));
};

export { bindHandle };