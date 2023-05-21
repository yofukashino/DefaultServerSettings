import { webpack } from "replugged";
import * as Types from "../types";

export const GuildNotificationUtils = webpack.getByProps([
  "updateGuildNotificationSettings",
]) as unknown as Types.GuildNotificationUtils;

export const NicknameUtils = webpack.getByProps([
  "changeNickname",
]) as unknown as Types.NicknameUtis;

export const VerificationUtils = webpack.getByProps([
  "submitVerificationForm",
]) as unknown as Types.VerificationUtils;
