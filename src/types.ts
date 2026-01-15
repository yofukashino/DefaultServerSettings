import { types } from "replugged";

import type { GuildSettingUtils } from "@lib/RequiredModules/GuildSettingUtils";
import type { GuildVerificationUtils } from "@lib/RequiredModules/GuildVerificationUtils";
import type { NicknameUtis } from "@lib/RequiredModules/NicknameUtils";
export namespace Types {
  export import DefaultTypes = types;
  export interface Modules {
    Proxy: Exclude<Modules, "Proxy" | "loadModules">;
    loadModules?: () => Promise<void>;
    GuildSettingUtils?: GuildSettingUtils;
    GuildVerificationUtils?: GuildVerificationUtils;
    NicknameUtils?: NicknameUtis;
  }
}

export default Types;
