import { app, BrowserWindow } from "electron";
import type { AppContext } from "./main";
import path from "node:path";

export const createWindow = (context: AppContext) => {
  const instanceLock = app.requestSingleInstanceLock();
  if (!instanceLock) {
    app.quit();
    return;
  }

  const { instance } = context;

  if (instance !== undefined) {
    if (!instance.isMinimized()) return;
    instance.restore();
    instance.focus();
    return;
  }

  const { isPackaged } = app;

  const isDev = !isPackaged;

  const win = new BrowserWindow({
    height: 1000,
    icon: path.join(process.env.VITE_PUBLIC, "logo.png"),
    webPreferences: {
      devTools: isDev,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenuBarVisibility(false);

  if (isDev) {
    win.webContents.openDevTools({
      mode: "bottom",
    });
  }

  if (context.VITE_DEV_SERVER_URL) {
    win.loadURL(context.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }

  context.instance = win;
};
