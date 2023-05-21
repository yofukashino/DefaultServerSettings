import { Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import { registerSettings } from "./Components/Settings";
export const PluginLogger = Logger.plugin("DefaultServerSettings");
export const SettingValues = await settings.init(
  "dev.tharki.DefaultServerSettings",
  defaultSettings,
);

import { addListeners, removeListeners } from "./listeners/index";

export const start = (): void => {
  registerSettings();
  addListeners();
};

export const stop = (): void => {
  removeListeners();
};
export { Settings } from "./Components/Settings.jsx";
