import { useMemo } from "react";
import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
  Switch,
} from "@fluentui/react-components";
import { useDark } from "./hooks";

export const App = () => {
  const { isDark, setDark } = useDark();

  const theme = useMemo(() => {
    return isDark ? webDarkTheme : webLightTheme;
  }, [isDark]);

  return (
    <FluentProvider
      className="
        absolute top-0 left-0 w-full h-full overflow-hidden
        transition-[all] duration-[var(--durationNormal)] ease-[var(--durationNormal)]
      "
      theme={theme}
    >
      <Switch
        label="黑暗模式"
        checked={isDark}
        onChange={(ev) => setDark(ev.currentTarget.checked)}
      />
    </FluentProvider>
  );
};
