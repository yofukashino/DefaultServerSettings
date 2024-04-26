import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.GuildNotificationUtils ??= await webpack.waitForProps<Types.GuildNotificationUtils>(
    "updateGuildNotificationSettings",
  );

  Modules.NicknameUtils ??= await webpack.waitForProps<Types.NicknameUtis>("changeNickname");

  Modules.VerificationUtils ??= await webpack.waitForProps<Types.VerificationUtils>(
    "submitVerificationForm",
  );
};

export default Modules;
