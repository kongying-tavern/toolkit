import type { ChangeEvent } from "react";
import { useState, useEffect, useCallback } from "react";

const query = window.matchMedia("(prefers-color-scheme: dark)");

export const useDark = () => {
  const [dark, setDark] = useState(query.matches);

  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setDark(ev.currentTarget.checked);
    },
    [setDark],
  );

  useEffect(() => {
    const handleColorSchemaChange = (ev: MediaQueryListEvent) => {
      setDark(ev.matches);
    };

    query.addEventListener("change", handleColorSchemaChange);

    return () => {
      query.removeEventListener("change", handleColorSchemaChange);
    };
  }, []);

  return {
    dark,
    setDark,
    onChange,
  };
};
