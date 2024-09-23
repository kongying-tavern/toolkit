import { useCallback, useMemo, useRef, Suspense } from "react";
import { useClickAway, useEventListener } from "ahooks";
import { Label } from "@fluentui/react-components";
import Lazymenu from "./modules";
import { useScopedStore } from "./stores";
import type { MenuItemProps, MenuPopoverProps } from "./types";

const MENU_OPTIONS: {
  label: string;
  key: string;
  menu?: React.LazyExoticComponent<() => JSX.Element>;
}[] = [
  { label: "文件", key: "file", menu: Lazymenu.MenuFile },
  { label: "编辑", key: "edit" },
  { label: "帮助", key: "help" },
];

const MENU_MAP = MENU_OPTIONS.reduce((map, { key, menu }) => {
  menu && map.set(key, menu);
  return map;
}, new Map<string, React.LazyExoticComponent<() => JSX.Element>>());

const MenuItem = ({
  itemKey,
  children,
}: React.PropsWithChildren<MenuItemProps>) => {
  const { activedMenuItem, setActivedMenuItem } = useScopedStore();

  const ref = useRef<HTMLDivElement>(null);

  const activeItem = useCallback(() => {
    if (!ref.current) return;

    const menuItem = { key: itemKey, ele: ref.current };

    if (!activedMenuItem || activedMenuItem.key !== menuItem.key) {
      setActivedMenuItem(menuItem);
      return;
    }
    setActivedMenuItem(null);
  }, [itemKey, activedMenuItem, setActivedMenuItem]);

  useEventListener(
    "pointerenter",
    () => {
      if (!activedMenuItem || activedMenuItem.key === itemKey) return;
      activeItem();
    },
    {
      target: ref,
    },
  );

  useEventListener(
    "pointerdown",
    (ev: Event) => {
      if (!activedMenuItem) return;
      ev.stopImmediatePropagation();
    },
    { target: ref },
  );

  const isActived = useMemo(
    () => activedMenuItem?.key === itemKey,
    [itemKey, activedMenuItem],
  );

  return (
    <div
      ref={ref}
      className={`
        px-2 rounded-md
        leading-[22px]
        text-[13px] text-[var(--colorNeutralForeground3)]
        select-none
        ${
          isActived
            ? `bg-[var(--colorNeutralBackground2Hover)]
              text-[var(--colorNeutralForeground2)]`
            : `hover:bg-[var(--colorNeutralBackground2Hover)]
              hover:text-[var(--colorNeutralForeground2)]`
        }
      `}
      onClick={activeItem}
    >
      {children}
    </div>
  );
};

const MenuPopover = ({
  activedMenuItem,
  children,
}: React.PropsWithChildren<MenuPopoverProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  const { setActivedMenuItem } = useScopedStore();

  const offset = useMemo(() => {
    const { x, y, height } = activedMenuItem.ele.getBoundingClientRect();
    return { x: x, y: y + height };
  }, [activedMenuItem.ele]);

  useClickAway(
    () => {
      setActivedMenuItem(null);
    },
    ref,
    "pointerdown",
  );

  return (
    <div
      ref={ref}
      className="
        rounded-md p-1
        fixed left-0 top-0
        bg-[var(--colorNeutralBackground1)]
        shadow
        border border-[var(--colorNeutralStroke3)]
        text-xs
        z-50
      "
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      {children ?? (
        <Label disabled size="small">
          -- 未设置菜单内容 --
        </Label>
      )}
    </div>
  );
};

const Loading = () => {
  return <div className="py-1 px-2 animate-pulse">加载组件中...</div>;
};

export const BrowserHeader = ({ children }: React.PropsWithChildren) => {
  const { activedMenuItem } = useScopedStore();

  const SubMenu = useMemo(() => {
    if (!activedMenuItem) return null;
    return MENU_MAP.get(activedMenuItem.key) ?? null;
  }, [activedMenuItem]);

  return (
    <div
      className="
        col-span-2
        h-8 shrink-0 px-1
        border-b-[1px]
        border-[var(--colorNeutralStroke3)]
        flex items-center gap-0.5
        transition-[background-color_border-color]
        duration-[var(--durationNormal)]
        ease-[var(--durationNormal)]
        bg-[var(--colorNeutralBackground2)]
        overflow-hidden
      "
    >
      {MENU_OPTIONS.map((menuItem) => (
        <MenuItem key={menuItem.key} itemKey={menuItem.key}>
          {menuItem.label}
        </MenuItem>
      ))}

      {activedMenuItem ? (
        <MenuPopover activedMenuItem={activedMenuItem}>
          {SubMenu ? (
            <Suspense fallback={<Loading />}>
              <SubMenu />
            </Suspense>
          ) : null}
        </MenuPopover>
      ) : null}

      <div className="flex-1 flex justify-end">{children}</div>
    </div>
  );
};
