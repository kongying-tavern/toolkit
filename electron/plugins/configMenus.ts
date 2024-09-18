const plugin: ElectronApp.Plugin = {
  afterCreated: (win) => {
    win.setMenuBarVisibility(false);
  },
};

export default plugin;
