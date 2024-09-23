import { create } from "zustand";

export const useSystemStore = create<System.State>(() => {
  return {
    dir: null as FileSystemDirectoryHandle | null,
  };
});
