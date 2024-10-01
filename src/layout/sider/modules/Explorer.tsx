import { useSystemStore } from "@/stores";
import { useAsyncEffect } from "ahooks";
import { useState } from "react";

interface FileObject {
  key: string;
  handle: FileSystemDirectoryHandle | FileSystemFileHandle;
}

const Module = () => {
  const { dir } = useSystemStore();

  const [files, setFiles] = useState<FileObject[]>([]);
  const [activedHandleKey, setActivedHandleKey] = useState("");

  useAsyncEffect(async () => {
    if (!dir) {
      setFiles([]);
      return;
    }
    console.log("dir", dir);
    const dirs: FileObject[] = [];
    for await (const { kind, name } of dir.values()) {
      const handle = await (kind === "file"
        ? dir.getFileHandle(name)
        : dir.getDirectoryHandle(name));
      dirs.push({
        key: crypto.randomUUID(),
        handle,
      });
    }
    setFiles(dirs);
  }, [dir]);

  return (
    <div
      className="
        h-full overflow-hidden
        flex flex-col
      "
    >
      {dir ? (
        <div
          className="
            px-2 leading-[22px]
            shrink-0 border-b-[1px] border-[var(--colorNeutralStroke3)]
            text-[11px] font-bold
          "
        >
          {dir.name}
        </div>
      ) : null}

      <div className="flex-1 overflow-auto" style={{ scrollbarWidth: "none" }}>
        {files.map(({ key, handle }) => (
          <div
            className={`
              px-2 overflow-hidden
              border border-transparent
              text-[13px] leading-[20px]
              whitespace-nowrap text-ellipsis
              select-none cursor-pointer
              ${
                activedHandleKey === key
                  ? `border-[var(--colorBrandStroke1)]
                    bg-[color-mix(in_srgb,var(--colorBrandBackgroundStatic)_30%,transparent_70%)]
                    `
                  : `hover:bg-[var(--colorNeutralBackground2Hover)]
                    `
              }
            `}
            key={key}
            onClick={() => setActivedHandleKey(key)}
          >
            {handle.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Module;
