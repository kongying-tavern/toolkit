import { app, BrowserWindow } from "electron";
import path from "node:path";
import { createWindow } from "./createWindow";
import configMenus from "./plugins/configMenus";
import configDevTools from "./plugins/configDevTools";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

const context: ElectronApp.Context = {
  isDev: !app.isPackaged,
};

void (async (context: ElectronApp.Context) => {
  await app.whenReady();

  const plugins: ElectronApp.Plugin[] = [configMenus, configDevTools];

  createWindow(context, plugins);

  app.on("window-all-closed", () => {
    if (process.platform === "darwin") return;
    app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length > 0) return;
    createWindow(context, plugins);
  });
})(context);
