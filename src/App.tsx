import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
  Switch,
} from "@fluentui/react-components";
import styles from "./App.module.css";

export const App = () => {
  const [dark, setDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setDark(ev.currentTarget.checked);
    },
    [setDark],
  );

  const theme = useMemo(() => {
    return dark ? webDarkTheme : webLightTheme;
  }, [dark]);

  useEffect(() => {
    const handleColorSchemaChange = (ev: MediaQueryListEvent) => {
      setDark(ev.matches);
    };
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    query.addEventListener("change", handleColorSchemaChange);
    return () => {
      query.removeEventListener("change", handleColorSchemaChange);
    };
  }, []);

  return (
    <FluentProvider theme={theme} className={styles.fluentProvider}>
      <Switch label="黑暗模式" checked={dark} onChange={onChange}></Switch>
    </FluentProvider>
  );
};
