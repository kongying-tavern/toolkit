import { useCallback, useMemo } from "react";
import LazyModule from "./modules";
import { useScopedStore } from "./stores";
import { SiderItem, SiderItemProps } from "./types";
import { Tooltip } from "@fluentui/react-components";

const SIDER_OPTIONS: SiderItem[] = [
  { label: "资源管理器", key: "explorer", icon: "", is: LazyModule.Explorer },
  { label: "Bug 反馈", key: "bug", icon: "" },
];

const SIDER_MAP = SIDER_OPTIONS.reduce((map, { key, is }) => {
  is && map.set(key, is);
  return map;
}, new Map<string, React.LazyExoticComponent<() => JSX.Element>>());

const SiderMenuItem = ({
  label,
  icon,
  itemKey,
}: React.PropsWithChildren<SiderItemProps>) => {
  const { activedSiderKey, setActivedSiderKey } = useScopedStore();

  const isActived = useMemo(
    () => itemKey === activedSiderKey,
    [itemKey, activedSiderKey],
  );

  const toggleItem = useCallback(() => {
    if (isActived) {
      setActivedSiderKey("");
      return;
    }
    setActivedSiderKey(itemKey);
  }, [isActived, itemKey, setActivedSiderKey]);

  return (
    <Tooltip
      withArrow
      showDelay={0}
      hideDelay={0}
      content={label}
      relationship="label"
      positioning="after"
    >
      <div
        className={`
          w-12 h-12 p-1
          grid place-content-center
          border border-transparent
          font-[SegoeIcons] text-xl
          select-none cursor-pointer
          hover:text-[var(--colorNeutralForeground1)]
          ${
            isActived
              ? `text-[var(--colorNeutralForeground1)]
              border-l-[var(--colorBrandStroke1)]
              `
              : `text-[var(--colorNeutralForeground3)]
              `
          }
        `}
        onClick={toggleItem}
      >
        {icon}
      </div>
    </Tooltip>
  );
};

export const BrowserSider = () => {
  const { activedSiderKey } = useScopedStore();

  const SiderExtraPanel = useMemo(
    () => SIDER_MAP.get(activedSiderKey) ?? null,
    [activedSiderKey],
  );

  return (
    <div
      className="
        overflow-hidden
        flex items-center
        transition-[background-color_border-color]
        duration-[var(--durationNormal)]
        ease-[var(--durationNormal)]
        bg-[var(--colorNeutralBackground2)]
      "
    >
      <div
        className="
          h-full w-[49px]
          border-r-[1px]
          border-[var(--colorNeutralStroke3)]
          transition-[border-color]
          duration-[var(--durationNormal)]
          ease-[var(--durationNormal)]
        "
      >
        {SIDER_OPTIONS.map(({ key, label, icon }) => (
          <SiderMenuItem key={key} itemKey={key} label={label} icon={icon} />
        ))}
      </div>

      {SiderExtraPanel ? (
        <div
          className="
            h-full w-[240px] overflow-hidden
            border-r-[1px]
            border-[var(--colorNeutralStroke3)]
            transition-[border-color]
            duration-[var(--durationNormal)]
            ease-[var(--durationNormal)]
          "
        >
          <SiderExtraPanel />
        </div>
      ) : null}
    </div>
  );
};
