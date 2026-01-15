import { fluxDispatcher } from "replugged/common";
import { SettingValues } from "@this";
import { DefaultSettings } from "@Consts";
import { GuildVerificationUtils } from "@lib/RequiredModules";

export const listener = ({ guildId }: { guildId: string; type: string }): void => {
  const terms = SettingValues.get("terms", DefaultSettings.terms);
  if (terms) {
    void GuildVerificationUtils.fetchVerificationForm(guildId).then(async (form) => {
      const termField = form.form_fields.find((c) => c.field_type === "TERMS");
      termField.response = true;
      await GuildVerificationUtils.submitVerificationForm(guildId, form);
    });
  }
};

export const subscribe = (): void => {
  fluxDispatcher.subscribe("GUILD_JOIN_REQUEST_CREATE", listener);
};

export const unsubscribe = (): void => {
  fluxDispatcher.unsubscribe("GUILD_JOIN_REQUEST_CREATE", listener);
};

export default { listener, subscribe, unsubscribe };
