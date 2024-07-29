import { app, BrowserWindow } from "electron";
import path from "node:path";
import { createWindow } from "./createWindow";

export interface AppContext {
  instance?: BrowserWindow;
  VITE_DEV_SERVER_URL?: string;
}

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

const context: AppContext = {
  VITE_DEV_SERVER_URL: process.env["VITE_DEV_SERVER_URL"],
};

void (async (context: AppContext) => {
  await app.whenReady();

  createWindow(context);

  app.on("window-all-closed", () => {
    if (process.platform === "darwin") return;
    app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length > 0) return;
    createWindow(context);
  });
})(context);
