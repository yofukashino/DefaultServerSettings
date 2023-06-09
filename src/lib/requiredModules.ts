import { webpack } from "replugged";
import * as Types from "../types";

export const GuildNotificationUtils = webpack.getByProps<Types.GuildNotificationUtils>([
  "updateGuildNotificationSettings",
]);

export const NicknameUtils = webpack.getByProps<Types.NicknameUtis>(["changeNickname"]);

export const VerificationUtils = webpack.getByProps<Types.VerificationUtils>([
  "submitVerificationForm",
]);
