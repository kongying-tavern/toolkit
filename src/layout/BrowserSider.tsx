export const BrowserSider = ({
  className = "",
}: React.PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <div
      className={`
        overflow-hidden
        flex items-center
        transition-[background-color_border-color]
        duration-[var(--durationNormal)]
        ease-[var(--durationNormal)]
        bg-[var(--colorNeutralBackground2)]
        ${className}
      `}
    >
      {/* 侧边图标栏 */}
      <div
        className="
          h-full w-12
          border-r-[1px]
          border-[var(--colorNeutralStroke3)]
          transition-[border-color]
          duration-[var(--durationNormal)]
          ease-[var(--durationNormal)]
          grid place-content-center
        "
      >
        侧边
      </div>

      {/* 侧边拓展 */}
      <div
        className="
          h-full w-[240px]
          grid place-content-center
          border-r-[1px]
          border-[var(--colorNeutralStroke3)]
          transition-[border-color]
          duration-[var(--durationNormal)]
          ease-[var(--durationNormal)]
        "
      >
        侧边拓展
      </div>
    </div>
  );
};
