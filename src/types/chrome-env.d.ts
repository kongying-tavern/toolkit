interface Window {
  /**
   * @Experimental
   * 显示一个文件选择器，以允许用户选择一个或多个文件并返回这些文件的句柄。
   */
  showOpenFilePicker(
    options: {
      /**
       * 布尔值，默认为 `false`。默认情况下，选择器应包含一个不应用任何文件类型过滤器的选项（通过下面的类型选项启动）。
       * 将此选项设置为 `true` 意味着该选项不可用。
       */
      excludeacceptalloption?: boolean;
      /**
       * 通过指定 ID，浏览器可以为不同的 ID 记住不同的目录。
       * 如果相同的 ID 用于另一个选择器，则该选择器将在同一目录中打开。
       */
      id?: number | string;
      /**
       * 布尔值，默认为 `false`。当设置为 `true` 时，可以选择多个文件。
       */
      multiple?: boolean;
      /**
       * 一个 `FileSystemHandle` 对象或一个众所周知的目录
       * （`"desktop"`、`"documents"`、`"downloads"`、`"music"`、`"pictures"` 或 `"videos"`）
       * 以指定打开选择器的起始目录。
       */
      startin?: FileSystemHandle | string;
      /**
       * 允许选择的文件类型的数组。每个项目都是一个具有以下选项的对象：
       * - `description` 允许的文件类型类别的可选描述。默认为空字符串。
       * - `accept` 一个 `Object`，其键设置为 `MIME` 类型，值设置为文件扩展名的数组（参见下面的示例）。
       * @example
       * ```
       * const options = {
       *   types: [
       *     {
       *       description: "Images",
       *       accept: {
       *         "image/*": [".png", ".gif", ".jpeg", ".jpg"],
       *       },
       *     },
       *   ],
       * }
       * ```
       */
      types?: { description?: string; accept: Record<string, string[]> }[];
    } = {},
  ): Promise<FileSystemFileHandle>;

  /**
   * @Experimental
   * 显示一个目录选择器，以允许用户选择一个目录。
   */
  showDirectoryPicker(
    options: {
      /**
       * 通过指定 ID，浏览器可以为不同的 ID 记住不同的目录。
       * 如果相同的 ID 用于另一个选择器，则该选择器将在同一目录中打开。
       */
      id?: number | string;
      /**
       * 字符串，默认为 `"read"`，用于只读访问，或 `"readwrite"` 用于读写访问。
       */
      mode?: "read" | "readwrite";
      /**
       * 一个 `FileSystemHandle` 对象或一个众所周知的目录
       * （`"desktop"`、`"documents"`、`"downloads"`、`"music"`、`"pictures"` 或 `"videos"`）
       * 以指定打开选择器的起始目录。
       */
      startin?: FileSystemHandle | string;
    } = {},
  ): Promise<FileSystemDirectoryHandle>;
}
