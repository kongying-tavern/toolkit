/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    DIST: string;

    /** /dist/ or /public/ */
    VITE_PUBLIC: string;

    /** @dev 仅限开发模式 */
    VITE_DEV_SERVER_URL?: string;
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
}
