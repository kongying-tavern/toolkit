import { useMemo } from "react";
import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
  Switch,
} from "@fluentui/react-components";
import { useDark } from "./hooks";
import * as Layout from "@/layout";

export const App = () => {
  const { isDark, setDark } = useDark();

  const theme = useMemo(() => {
    return isDark ? webDarkTheme : webLightTheme;
  }, [isDark]);

  return (
    <FluentProvider
      className="
        absolute top-0 left-0 w-full h-full overflow-hidden
        grid grid-rows-[auto_1fr] grid-cols-[auto_1fr]
        transition-[background-color] duration-[var(--durationNormal)] ease-[var(--durationNormal)]
      "
      theme={theme}
    >
      <Layout.BrowserHeader>
        <Switch
          label="Dark"
          checked={isDark}
          onChange={(ev) => setDark(ev.currentTarget.checked)}
        />
      </Layout.BrowserHeader>

      <Layout.BrowserSider />

      <div
        className="
          w-full h-full
          grid place-content-center
          bg-[var(--colorNeutralBackground1)]
          transition-[background-color] duration-[var(--durationNormal)] ease-[var(--durationNormal)]
        "
      >
        内容
      </div>
    </FluentProvider>
  );
};
