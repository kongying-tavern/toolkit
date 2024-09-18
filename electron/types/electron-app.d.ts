declare namespace ElectronApp {
  interface Context {
    isDev: boolean;
    instance?: BrowserWindow;
  }

  interface Plugin {
    afterCreated?: (win: BrowserWindow, ctx: Context) => void;
  }
}
