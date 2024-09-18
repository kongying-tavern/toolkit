import { app, BrowserWindow } from "electron";
import path from "node:path";

export const createWindow = (
  context: ElectronApp.Context,
  plugins: ElectronApp.Plugin[] = [],
) => {
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

  const win = new BrowserWindow({
    height: 1000,
    icon: path.join(process.env.VITE_PUBLIC, "logo.png"),
    webPreferences: {
      devTools: !app.isPackaged,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  plugins.forEach((plugin) => plugin.afterCreated?.(win, context));

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }

  context.instance = win;

  return;
};
