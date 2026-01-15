import { util } from "replugged";
import { guilds, modal, users } from "replugged/common";
import { ButtonItem, Category, Select, Stack, Switch, TextInput } from "replugged/components";
import { PluginLogger, SettingValues } from "@this";
import { DefaultSettings } from "@Consts";
import { GuildSettingUtils, NicknameUtils } from "@lib/RequiredModules";
import Utils from "@Utils";

export const registerSettings = (): void => {
  type DefaultSettings = typeof DefaultSettings;
  type key = keyof DefaultSettings;
  type value = DefaultSettings[key];

  for (const key in DefaultSettings) {
    if (SettingValues.has(key as key)) continue;
    PluginLogger.log(`Adding new setting ${key} with value ${DefaultSettings[key]}.`);
    SettingValues.set(key as key, DefaultSettings[key] as value);
  }
};

export const applyServerSettingsToAll = async (): Promise<void> => {
  const currentSettings = {
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
  const guildIds = guilds.getGuilds();
  for (const guildID in guildIds) {
    GuildSettingUtils.updateGuildNotificationSettings(guildID, currentSettings);
    await util.sleep(1000);
  }
  PluginLogger.log("Default Settings Applied to all guilds");
  modal.alert({
    title: "DefaultServerSettings",
    body: "Thanks for waiting, Default Settings have been applied to all servers.",
    confirmText: "OK",
  });
};

export const applyNicknameToAll = async (): Promise<void> => {
  const guildIds = guilds.getGuilds();
  const nickname = SettingValues.get("nickname", DefaultSettings.nickname);
  for (const guildID in guildIds) {
    NicknameUtils.changeNickname(guildID, null, "@me", nickname);
    await util.sleep(1000);
  }
  PluginLogger.log("Default Nickname Applied to all guilds");
  modal.alert({
    title: "DefaultServerSettings",
    body: "Thanks for waiting, Default nickname have been applied to all servers (Where you had permissions obviously).",
    confirmText: "OK",
  });
};

export const Settings = (): React.ReactElement => {
  return (
    <Stack gap={24}>
      <Category label="Server Settings" open={false}>
        <Stack gap={24}>
          <Switch
            label="Mute Server"
            {...util.useSetting(SettingValues, "muted", DefaultSettings.muted)}
          />

          <Select
            label="Message Notifications"
            options={[
              {
                label: "All Messages",
                value: "0",
              },
              {
                label: "Only mentions",
                value: "1",
              },
              {
                label: "Nothing",
                value: "2",
              },
            ]}
            {...util.useSetting(
              SettingValues,
              "messageNotifications",
              DefaultSettings.messageNotifications,
            )}
          />
          <Switch
            label="Highlight Notifications"
            {...util.useSetting(
              SettingValues,
              "notifyHighlights",
              DefaultSettings.notifyHighlights,
            )}
          />
          <Switch
            label="Suppress @everyone and @here"
            {...util.useSetting(SettingValues, "supressEveryone", DefaultSettings.supressEveryone)}
          />
          <Switch
            label="Suppress @role mentions"
            {...util.useSetting(SettingValues, "supressRoles", DefaultSettings.supressRoles)}
          />
          <Switch
            label="Mobile Push Notifications"
            {...util.useSetting(SettingValues, "mobilePush", DefaultSettings.mobilePush)}
          />

          <Switch
            label="Mute New Events"
            {...util.useSetting(
              SettingValues,
              "muteScheduledEvents",
              DefaultSettings.muteScheduledEvents,
            )}
          />
          <Switch
            label="Show All Channels"
            {...util.useSetting(SettingValues, "flags", DefaultSettings.flags)}
          />

          <Switch
            label="Hide Muted Channels"
            {...util.useSetting(
              SettingValues,
              "hideMutedChannels",
              DefaultSettings.hideMutedChannels,
            )}
          />
          <ButtonItem
            button="Apply to all servers"
            description="Pressing this button will apply the above set settings to all existing servers your have  joined."
            onClick={() => {
              modal.alert({
                title: "Are you sure you want to continue?",
                body: `This will apply these settings to all servers you are in and might take an approx of ${Utils.toDaysMinutesSeconds(
                  Object.keys(guilds.getGuilds()).length * 10,
                )}.`,
                confirmText: "Yes",
                cancelText: "No",
                onConfirm: applyServerSettingsToAll,
              });
            }}
          />
        </Stack>
      </Category>
      <Category label="Server Profile" open={false}>
        <Stack gap={24}>
          <TextInput
            label="Nickname"
            description="May not work on all servers, since a lot of them won't give you the permission to change nickname instantly"
            placeholder={users.getCurrentUser().username}
            {...util.useSetting(SettingValues, "nickname", DefaultSettings.nickname)}
          />
          <ButtonItem
            button="Apply to all servers"
            description="Pressing this button will apply the above set nickname to all existing servers your have (Where you have permissions to do so obviously)."
            onClick={() => {
              modal.alert({
                title: "Are you sure you want to continue?",
                body: `This will apply this nickname to all servers you are in and might take an approx of ${Utils.toDaysMinutesSeconds(
                  Object.keys(guilds.getGuilds()).length * 10,
                )}.`,
                confirmText: "Yes",
                cancelText: "No",
                onConfirm: applyNicknameToAll,
              });
            }}
          />
        </Stack>
      </Category>
      <Category label="Server Verification" open={false}>
        <Stack gap={24}>
          <Switch
            label="Accept server terms (Would not skip onboarding but only accepts rules automatically)."
            {...util.useSetting(SettingValues, "terms", DefaultSettings.terms)}
          />
        </Stack>
      </Category>
    </Stack>
  );
};

export default { registerSettings, applyServerSettingsToAll, applyNicknameToAll, Settings };
