import { useMemo } from "react";
import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
  Switch,
} from "@fluentui/react-components";
import styles from "./App.module.css";
import { useDark } from "./hooks";

export const App = () => {
  const [dark, { onChange }] = useDark();

  const theme = useMemo(() => {
    return dark ? webDarkTheme : webLightTheme;
  }, [dark]);

  return (
    <FluentProvider theme={theme} className={styles.fluentProvider}>
      <Switch label="黑暗模式" checked={dark} onChange={onChange}></Switch>
    </FluentProvider>
  );
};
