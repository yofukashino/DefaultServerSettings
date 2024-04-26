import { Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";

export const PluginLogger = Logger.plugin("DefaultServerSettings");
export const SettingValues = await settings.init(
  "dev.tharki.DefaultServerSettings",
  defaultSettings,
);
import Settings from "./Components/Settings";
import Listeners from "./listeners";

export const start = (): void => {
  Settings.registerSettings();
  void Listeners.addListeners();
};

export const stop = (): void => {
  Listeners.removeListeners();
};
export { Settings } from "./Components/Settings.jsx";
