import { fluxDispatcher } from "replugged/common";
import { SettingValues } from "@this";
import { DefaultSettings } from "@Consts";
import { GuildSettingUtils, GuildVerificationUtils, NicknameUtils } from "@lib/RequiredModules";

const listener = ({
  guild,
}: {
  guild: {
    id: string;
  };
  type: string;
}): void => {
  const muted = SettingValues.get("muted", DefaultSettings.muted);
  const messageNotifications = Number(
    SettingValues.get("messageNotifications", DefaultSettings.messageNotifications),
  );
  const notifyHighlights = SettingValues.get("notifyHighlights", DefaultSettings.notifyHighlights);
  const supressEveryone = SettingValues.get("supressEveryone", DefaultSettings.supressEveryone);
  const supressRoles = SettingValues.get("supressRoles", DefaultSettings.supressRoles);
  const mobilePush = SettingValues.get("mobilePush", DefaultSettings.mobilePush);
  const muteScheduledEvents = SettingValues.get(
    "muteScheduledEvents",
    DefaultSettings.muteScheduledEvents,
  );
  const hideMutedChannels = SettingValues.get(
    "hideMutedChannels",
    DefaultSettings.hideMutedChannels,
  );
  const showAllChannels = SettingValues.get("flags", DefaultSettings.flags);

  const currentSetting = {
    muted,
    message_notifications: messageNotifications,
    notify_highlights: notifyHighlights ? 2 : 1,
    suppress_everyone: supressEveryone,
    suppress_roles: supressRoles,
    mobile_push: mobilePush,
    mute_scheduled_events: muteScheduledEvents,
    hide_muted_channels: hideMutedChannels,
    flags: (messageNotifications === 0 ? 2048 : 4096) + (showAllChannels ? 0 : 16384),
  };
  GuildSettingUtils.updateGuildNotificationSettings(guild.id, currentSetting);
  const nickname = SettingValues.get("nickname", DefaultSettings.nickname);
  if (nickname) NicknameUtils.changeNickname(guild.id, null, "@me", nickname);

  const terms = SettingValues.get("terms", DefaultSettings.terms);
  if (terms) {
    void GuildVerificationUtils.fetchVerificationForm(guild.id).then(async (form) => {
      form.formFields = form.form_fields;
      delete form.form_fields;
      const termField = form.formFields.find((c) => c.field_type === "TERMS");
      termField.response = true;
      await GuildVerificationUtils.submitVerificationForm(guild.id, form);
    });
  }
};

export const subscribe = (): void => {
  fluxDispatcher.subscribe("GUILD_CREATE", listener);
};

export const unsubscribe = (): void => {
  fluxDispatcher.unsubscribe("GUILD_CREATE", listener);
};

export default { listener, subscribe, unsubscribe };
