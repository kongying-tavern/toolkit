import { create } from "zustand";
import type { SharedStore } from "../types";

export const useScopedStore = create<SharedStore>((set) => ({
  activedMenuItem: null,
  setActivedMenuItem: (menuItem) => {
    set({ activedMenuItem: menuItem });
  },
}));
