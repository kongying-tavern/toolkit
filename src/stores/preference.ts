import { create } from "zustand";

export const usePreferenceStore = create<Preference.Config>(() => {
  return {
    themeSchema: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  };
});
