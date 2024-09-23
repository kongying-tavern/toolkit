const plugin: ElectronApp.Plugin = {
  afterCreated: (win, ctx) => {
    if (!ctx.isDev) return;
    win.webContents.openDevTools({
      mode: "undocked",
    });
  },
};

export default plugin;
