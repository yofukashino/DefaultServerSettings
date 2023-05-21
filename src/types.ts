import { types as DefaultTypes } from "replugged";
export { types as DefaultTypes } from "replugged";
export { ReactElement } from "react";

export interface GuildNotificationUtils {
  close: DefaultTypes.AnyFunction;
  handleCheckboxChange: DefaultTypes.AnyFunction;
  handleHighlightsChange: DefaultTypes.AnyFunction;
  handleMuteConfigChange: DefaultTypes.AnyFunction;
  handleProfileChange: DefaultTypes.AnyFunction;
  handleSelectChange: DefaultTypes.AnyFunction;
  open: DefaultTypes.AnyFunction;
  setForumThreadsCreated: DefaultTypes.AnyFunction;
  updateChannelOverrideSettings: DefaultTypes.AnyFunction;
  updateChannelOverrideSettingsBulk: DefaultTypes.AnyFunction;
  updateGuildAndChannelNotificationSettings: DefaultTypes.AnyFunction;
  updateGuildNotificationSettings: DefaultTypes.AnyFunction;
  updateGuildNotificationSettingsBulk: DefaultTypes.AnyFunction;
}

export interface NicknameUtis {
  changeNickname: DefaultTypes.AnyFunction;
}

export interface VerificationUtils {
  enableVerificationForm: DefaultTypes.AnyFunction;
  fetchVerificationForm: DefaultTypes.AnyFunction;
  submitVerificationForm: DefaultTypes.AnyFunction;
  updateVerificationForm: DefaultTypes.AnyFunction;
  updateVerificationFormDescription: DefaultTypes.AnyFunction;
}

export interface GuildCreateInfo {
  guild: {
    id: string;
  };
  type: string;
}

export interface GuildJoinRequestInfo {
  guildId: string;
  type: string;
}

export interface Settings {
  muted: boolean;
  messageNotifications: string;
  notifyHighlights: string;
  supressEveryone: boolean;
  supressRoles: boolean;
  mobilePush: true;
  muteScheduledEvents: boolean;
  flags: string;
  hideMutedChannels: boolean;
  nickname: string;
  terms: boolean;
}
