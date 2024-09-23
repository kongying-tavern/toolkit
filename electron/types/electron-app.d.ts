/// <reference types="electron/electron" />

declare namespace ElectronApp {
  interface Context {
    isDev: boolean;
    instance?: Electron.BrowserWindow;
  }

  interface Plugin {
    afterCreated?: (
      win: Electron.BrowserWindow,
      ctx: ElectronApp.Context,
    ) => void;
  }
}
