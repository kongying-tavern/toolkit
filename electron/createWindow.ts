import { app, BrowserWindow, session } from "electron";
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
    minWidth: 600 + 16,
    minHeight: 400 + 39,
    width: 600 + 16,
    height: 400 + 39,
    icon: path.join(process.env.VITE_PUBLIC, "logo.png"),
    webPreferences: {
      nodeIntegration: true,
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

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        // 设置 CSP 策略消除 Electron 安全警告
        "Content-Security-Policy": "default-src 'self' 'unsafe-inline' blob:",
        // 设置 COOP 和 COEP 来启用 SharedArrayBuffers
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    });
  });
};
