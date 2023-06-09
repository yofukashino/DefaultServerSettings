import { common, components, util } from "replugged";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import { GuildNotificationUtils, NicknameUtils } from "../lib/requiredModules";
import * as Utils from "../lib/utils";
const { users: UltimateUserStore, guilds: UltimateGuildsStore, modal: ModalUtils } = common;
const { SelectItem, SwitchItem, Category, TextInput, FormItem, ButtonItem } = components;
import * as Types from "../types";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};
export const applyServerSettingsToAll = async (): Promise<void> => {
  const Guilds = UltimateGuildsStore.getGuilds();
  for (const GuildID in Guilds) {
    GuildNotificationUtils.updateGuildNotificationSettings(GuildID, {
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
      hide_muted_channels: SettingValues.get(
        "hideMutedChannels",
        defaultSettings.hideMutedChannels,
      ),
    });
    await util.sleep(1000);
  }
  PluginLogger.log("Default Settings Applied to all guilds");
  ModalUtils.alert({
    title: "DefaultServerSettings",
    body: "Thanks for waiting, Default Settings have been applied to all servers.",
    confirmText: "OK",
  });
};
export const applyNicknameToAll = async (): Promise<void> => {
  const Guilds = UltimateGuildsStore.getGuilds();
  for (const GuildID in Guilds) {
    NicknameUtils.changeNickname(
      GuildID,
      null,
      "@me",
      SettingValues.get("nickname", defaultSettings.nickname),
    );
    await util.sleep(1000);
  }
  PluginLogger.log("Default Nickname Applied to all guilds");
  ModalUtils.alert({
    title: "DefaultServerSettings",
    body: "Thanks for waiting, Default nickname have been applied to all servers (Where you had permissions obviously).",
    confirmText: "OK",
  });
};
export const Settings = (): Types.ReactElement => {
  return (
    <div>
      <Category
        {...{
          title: "Server Settings",
          open: false,
        }}>
        <SwitchItem
          {...{
            ...util.useSetting(SettingValues, "muted", defaultSettings.muted),
          }}>
          Mute Server
        </SwitchItem>
        <SelectItem
          {...{
            options: [
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
            ],
            ...util.useSetting(
              SettingValues,
              "messageNotifications",
              defaultSettings.messageNotifications,
            ),
          }}>
          Message Notifications
        </SelectItem>
        <SwitchItem
          {...{
            ...util.useSetting(SettingValues, "notifyHighlights", defaultSettings.notifyHighlights),
          }}>
          Highlight Notifications
        </SwitchItem>
        <SwitchItem
          {...{
            ...util.useSetting(SettingValues, "supressEveryone", defaultSettings.supressEveryone),
          }}>
          Suppress @everyone and @here
        </SwitchItem>
        <SwitchItem
          {...{
            ...util.useSetting(SettingValues, "supressRoles", defaultSettings.supressRoles),
          }}>
          Suppress @role mentions
        </SwitchItem>
        <SwitchItem
          {...{
            ...util.useSetting(SettingValues, "mobilePush", defaultSettings.mobilePush),
          }}>
          Mobile Push Notifications
        </SwitchItem>
        <SwitchItem
          {...{
            ...util.useSetting(
              SettingValues,
              "muteScheduledEvents",
              defaultSettings.muteScheduledEvents,
            ),
          }}>
          Mute New Events
        </SwitchItem>
        <SwitchItem
          {...{
            ...util.useSetting(SettingValues, "flags", defaultSettings.flags),
          }}>
          Show All Channels
        </SwitchItem>
        <SwitchItem
          {...{
            ...util.useSetting(
              SettingValues,
              "hideMutedChannels",
              defaultSettings.hideMutedChannels,
            ),
          }}>
          Hide Muted Channels
        </SwitchItem>
        <ButtonItem
          {...{
            button: "Apply to all servers",
            onClick: () => {
              ModalUtils.alert({
                title: "Are you sure you want to continue?",
                body: `This will apply these settings to all servers you are in and might take an approx of ${Utils.toDaysMinutesSeconds(
                  Object.keys(UltimateGuildsStore.getGuilds()).length * 10,
                )}.`,
                confirmText: "Yes",
                cancelText: "No",
                onConfirm: applyServerSettingsToAll,
              });
            },
          }}>
          Pressing this button will apply the above set settings to all existing servers your have
          joined.
        </ButtonItem>
      </Category>
      <Category
        {...{
          title: "Server Profile",
          open: false,
        }}>
        <FormItem
          {...{
            title: "Nickname",
            note: "May not work on all servers, since a lot of them won't give you the permission to change nickname instantly",
            notePosition: "after",
          }}>
          <TextInput
            {...{
              placeholder: UltimateUserStore.getCurrentUser().username,
              ...util.useSetting(SettingValues, "nickname", defaultSettings.nickname),
            }}
          />
        </FormItem>
        <ButtonItem
          {...{
            button: "Apply to all servers",
            onClick: () => {
              ModalUtils.alert({
                title: "Are you sure you want to continue?",
                body: `This will apply this nickname to all servers you are in and might take an approx of ${Utils.toDaysMinutesSeconds(
                  Object.keys(UltimateGuildsStore.getGuilds()).length * 10,
                )}.`,
                confirmText: "Yes",
                cancelText: "No",
                onConfirm: applyNicknameToAll,
              });
            },
          }}>
          Pressing this button will apply the above set nickname to all existing servers your have
          (Where you have permissions to do so obviously).
        </ButtonItem>
      </Category>
      <Category
        {...{
          title: "Server Verification",
          open: false,
        }}>
        <SwitchItem
          {...{
            ...util.useSetting(SettingValues, "terms", defaultSettings.terms),
          }}>
          Accept server terms (Might not work as intended).
        </SwitchItem>
      </Category>
    </div>
  );
};
