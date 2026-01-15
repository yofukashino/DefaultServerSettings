import { fluxDispatcher } from "replugged/common";
import { SettingValues } from "@this";
import { DefaultSettings } from "@Consts";
import { GuildSettingUtils, NicknameUtils } from "@lib/RequiredModules";

const listener = ({
  guild,
}: {
  guild: {
    id: string;
  };
  type: string;
}): void => {
  console.log(guild);
  const currentSetting = {
    muted: SettingValues.get("muted", DefaultSettings.muted),
    message_notifications: Number(
      SettingValues.get("messageNotifications", DefaultSettings.messageNotifications),
    ),
    notify_highlights: SettingValues.get("notifyHighlights", DefaultSettings.notifyHighlights)
      ? 2
      : 1,
    suppress_everyone: SettingValues.get("supressEveryone", DefaultSettings.supressEveryone),
    suppress_roles: SettingValues.get("supressRoles", DefaultSettings.supressRoles),
    mobile_push: SettingValues.get("mobilePush", DefaultSettings.mobilePush),
    mute_scheduled_events: SettingValues.get(
      "muteScheduledEvents",
      DefaultSettings.muteScheduledEvents,
    ),
    flags: SettingValues.get("flags", DefaultSettings.flags) ? 0 : 16384,
    hide_muted_channels: SettingValues.get("hideMutedChannels", DefaultSettings.hideMutedChannels),
  };
  GuildSettingUtils.updateGuildNotificationSettings(guild.id, currentSetting);
  const nickname = SettingValues.get("nickname", DefaultSettings.nickname);
  if (nickname) NicknameUtils.changeNickname(guild.id, null, "@me", nickname);
};

export const subscribe = (): void => {
  fluxDispatcher.subscribe("GUILD_CREATE", listener);
};

export const unsubscribe = (): void => {
  fluxDispatcher.unsubscribe("GUILD_CREATE", listener);
};

export default { listener, subscribe, unsubscribe };
