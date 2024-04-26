import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";
export default ({ guild }: Types.GuildCreateInfo): void => {
  const { GuildNotificationUtils, NicknameUtils } = Modules;
  GuildNotificationUtils.updateGuildNotificationSettings(guild.id, {
    muted: SettingValues.get("muted", defaultSettings.muted),
    message_notifications: Number(
      SettingValues.get("messageNotifications", defaultSettings.messageNotifications),
    ),
    notify_highlights: SettingValues.get("notifyHighlights", defaultSettings.notifyHighlights)
      ? 2
      : 1,
    suppress_everyone: SettingValues.get("supressEveryone", defaultSettings.supressEveryone),
    suppress_roles: SettingValues.get("supressRoles", defaultSettings.supressRoles),
    mobile_push: SettingValues.get("mobilePush", defaultSettings.mobilePush),
    mute_scheduled_events: SettingValues.get(
      "muteScheduledEvents",
      defaultSettings.muteScheduledEvents,
    ),
    flags: SettingValues.get("flags", defaultSettings.flags) ? 0 : 16384,
    hide_muted_channels: SettingValues.get("hideMutedChannels", defaultSettings.hideMutedChannels),
  });
  if (SettingValues.get("nickname", defaultSettings.nickname))
    NicknameUtils.changeNickname(
      guild.id,
      null,
      "@me",
      SettingValues.get("nickname", defaultSettings.nickname),
    );
};
