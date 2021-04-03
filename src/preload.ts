import { contextBridge, ipcRenderer } from 'electron'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel: string, data:any) => {
    // whitelist channels
    let validChannels = ['toMain', 'drop']
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel: string, func: (args?: any[]) => void) => {
    let validChannels = ['fromMain', 'file']
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(channel, (event, ...args) => func(...args))
    }
  }
})