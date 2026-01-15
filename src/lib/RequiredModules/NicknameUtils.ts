import { webpack } from "replugged";

export interface NicknameUtis {
  changeNickname: (
    GuildID: string,
    responseChannelId: null | string,
    user: string,
    nickname: string,
  ) => unknown;
}

export default await webpack
  .waitForProps<NicknameUtis>(["changeNickname"], {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find NicknameUtils Module");
  });
