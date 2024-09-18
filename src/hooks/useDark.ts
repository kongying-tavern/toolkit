import { useMemo, useCallback } from "react";
import { usePreferenceStore } from "@/stores";

export const useDark = () => {
  const { themeSchema } = usePreferenceStore();

  const isDark = useMemo(() => themeSchema === "dark", [themeSchema]);

  const setDark = useCallback((dark: boolean) => {
    usePreferenceStore.setState({ themeSchema: dark ? "dark" : "light" });
  }, []);

  return {
    isDark,
    setDark,
  };
};
