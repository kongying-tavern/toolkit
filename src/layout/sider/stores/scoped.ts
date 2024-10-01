import type { SharedStore } from "../types";
import { create } from "zustand";

export const useScopedStore = create<SharedStore>((set) => ({
  activedSiderKey: "",
  setActivedSiderKey: (key) => {
    set({ activedSiderKey: key });
  },
}));
