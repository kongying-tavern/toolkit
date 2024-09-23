import { useCallback } from "react";
import { useSystemStore } from "@/stores";
import { useScopedStore } from "../stores";

const Module = () => {
  const { setActivedMenuItem } = useScopedStore();

  const handleClick = useCallback(async () => {
    setActivedMenuItem(null);
    const dir = await window
      .showDirectoryPicker({
        mode: "readwrite",
      })
      .catch(() => null);
    if (!dir) return;
    useSystemStore.setState({ dir });
  }, [setActivedMenuItem]);

  return (
    <div
      className="
        box-border
        py-1 px-4 w-[200px] rounded
        flex items-center
        cursor-pointer
        hover:bg-[var(--colorBrandForegroundInverted)]
        active:bg-[var(--colorBrandForegroundInvertedHover)]
      "
      onClick={handleClick}
    >
      打开文件夹
    </div>
  );
};

export default Module;
