import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.GuildNotificationUtils ??= await webpack
    .waitForProps<Types.GuildNotificationUtils>(["updateGuildNotificationSettings"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find GuildNotificationUtils Module");
    });

  Modules.NicknameUtils ??= await webpack
    .waitForProps<Types.NicknameUtis>(["changeNickname"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find NicknameUtils Module");
    });

  Modules.VerificationUtils ??= await webpack
    .waitForProps<Types.VerificationUtils>(["submitVerificationForm"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find VerificationUtils Module");
    });
};

export default Modules;
