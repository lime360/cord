import { app, BrowserWindow, session } from "electron";
import path from "node:path";
import fs from "node:fs";

function create() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  const filter = {
    urls: [
      "*://sentry.io/*",
      "*://*.sentry.io/*",
      "*://discord.com/api/*/science*",
      "*://discord.com/api/v*/science*",
      "*://google-analytics.com/*",
    ],
  };

  win.webContents.executeJavaScript(`
    Object.defineProperty(window, "Sentry", {
      get: () => undefined,
      set: () => {},
    });
  `);

  session.defaultSession.webRequest.onBeforeRequest(
    filter,
    (details, callback) => {
      console.log("Blocked ", details.url);
      callback({ cancel: true });
    },
  );

  win.loadURL("https://discord.com/app");

  win.webContents.on("did-finish-load", () => {
    if (fs.existsSync("assets/index.css")) {
      win.webContents.insertCSS(fs.readFileSync("assets/index.css", "utf-8"));
    }
  });
}

app.on("ready", create);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
