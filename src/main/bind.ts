import { BrowserWindow, IpcMainEvent, ipcMain } from 'electron';

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
};

export { bindHandle };