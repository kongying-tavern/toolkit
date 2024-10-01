export interface SiderItem {
  label: string;
  key: string;
  icon: string;
  is?: React.LazyExoticComponent<() => JSX.Element>;
}

export interface SiderItemProps {
  label: string;
  icon: string;
  itemKey: string;
}

export interface SharedStore {
  activedSiderKey: string;
  setActivedSiderKey: (key: string) => void;
}
