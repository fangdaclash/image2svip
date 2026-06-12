const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  platform: process.platform,
  isElectron: true,
  saveFileDialog: async (dataUrl, defaultName) => {
    return ipcRenderer.invoke("save-file-dialog", dataUrl, defaultName);
  }
});
