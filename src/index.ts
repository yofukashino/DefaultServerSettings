import { Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import { registerSettings } from "./Components/Settings";
export const PluginLogger = Logger.plugin("DefaultServerSettings");
export const SettingValues = await settings.init(
  "dev.tharki.DefaultServerSettings",
  defaultSettings,
);
import Listeners from "./listeners";

export const start = (): void => {
  registerSettings();
  Listeners.addListeners();
};

export const stop = (): void => {
  Listeners.removeListeners();
};
export { Settings } from "./Components/Settings.jsx";
