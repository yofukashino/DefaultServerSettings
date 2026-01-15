import { Logger, settings } from "replugged";
import { DefaultSettings } from "@Consts";

export const PluginLogger = Logger.plugin("DefaultServerSettings", "#ffffff80");
export const SettingValues = settings.init("dev.tharki.DefaultServerSettings", DefaultSettings);
import Settings from "@components/Settings";
import Listeners from "@Listeners";

export const start = (): void => {
  Settings.registerSettings();
  void Listeners.addListeners();
};

export const stop = (): void => {
  void Listeners.removeListeners();
};

export { Settings } from "@components/Settings";
