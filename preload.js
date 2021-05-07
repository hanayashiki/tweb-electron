const {
  contextBridge,
  shell,
} = require("electron");

const allowedSchemes = [
  "http",
  "https",
  "mailto",
];

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "electronHelpers", {
    openExternal(url) {
      if (!allowedSchemes.some((scheme) => url.startsWith(`${scheme}://`))) {
        return;
      }
      shell.openExternal(url);
    },
  },
);
