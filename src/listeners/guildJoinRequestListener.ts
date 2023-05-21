import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import { VerificationUtils } from "../lib/requiredModules";
import * as Types from "../types";
export const guildJoinRequestListener = (info): void => {
  const { guildId } = info as Types.GuildJoinRequestInfo;
  if (SettingValues.get("terms", defaultSettings.terms))
    VerificationUtils.submitVerificationForm(guildId, "@me");
};
