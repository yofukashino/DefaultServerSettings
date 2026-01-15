import { webpack } from "replugged";

export interface GuildSettingUtils {
  /*   close: DefaultTypes.AnyFunction;
  handleCheckboxChange: DefaultTypes.AnyFunction;
  handleHighlightsChange: DefaultTypes.AnyFunction;
  handleMuteConfigChange: DefaultTypes.AnyFunction;
  handleProfileChange: DefaultTypes.AnyFunction;
  handleSelectChange: DefaultTypes.AnyFunction;
  open: DefaultTypes.AnyFunction;
  setForumThreadsCreated: DefaultTypes.AnyFunction;
  updateChannelOverrideSettings: DefaultTypes.AnyFunction;
  updateChannelOverrideSettingsBulk: DefaultTypes.AnyFunction;
  updateGuildAndChannelNotificationSettings: DefaultTypes.AnyFunction;*/
  updateGuildNotificationSettings: (
    guildId: string,
    currentSettings: Record<string, unknown>,
  ) => unknown;
  updateGuildNotificationSettingsBulk: (
    settings: Record<string, Record<string, unknown>>,
  ) => unknown;
}

export default await webpack
  .waitForProps<GuildSettingUtils>(["updateGuildNotificationSettings"], {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find GuildSettingUtils Module");
  });
