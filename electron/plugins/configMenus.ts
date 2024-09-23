import { Menu } from "electron";

const plugin: ElectronApp.Plugin = {
  afterCreated: () => {
    Menu.setApplicationMenu(null);
  },
};

export default plugin;
