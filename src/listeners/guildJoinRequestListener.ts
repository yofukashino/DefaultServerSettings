import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";
export default (info): void => {
  const { guildId } = info as Types.GuildJoinRequestInfo;
  if (SettingValues.get("terms", defaultSettings.terms))
    Modules.VerificationUtils.submitVerificationForm(guildId, "@me");
};
