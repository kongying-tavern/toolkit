export interface MenuItemInfo {
  key: string;
  ele: HTMLElement;
}

export interface MenuItemProps {
  itemKey: string;
}

export interface MenuPopoverProps {
  activedMenuItem: MenuItemInfo;
}

export interface SharedStore {
  activedMenuItem: MenuItemInfo | null;
  setActivedMenuItem: (menuItem: MenuItemInfo | null) => void;
}
