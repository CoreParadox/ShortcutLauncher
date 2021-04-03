import { ipcRenderer, IpcRenderer } from "electron";
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

import { IpcRenderer } from "electron"

declare module 'electron' {
  interface IpcRenderer {
    receive: (channel: string, func: (args: any[]) => void) => void;
  }
}


declare global {
  interface Window { ipcRenderer: IpcRenderer; }
}

window.ipcRenderer = ipcRenderer;
export default window;


