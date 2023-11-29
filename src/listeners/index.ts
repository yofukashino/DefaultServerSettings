import { fluxDispatcher as FluxDispatcher } from "replugged/common";
import { guildCreateListener } from "./guildCreateListener";
import { guildJoinRequestListener } from "./guildJoinRequestListener";
export const addListeners = (): void => {
  FluxDispatcher.subscribe("GUILD_CREATE", guildCreateListener);
  FluxDispatcher.subscribe("GUILD_JOIN_REQUEST_CREATE", guildJoinRequestListener);
};
export const removeListeners = (): void => {
  FluxDispatcher.unsubscribe("GUILD_CREATE", guildCreateListener);
  FluxDispatcher.unsubscribe("GUILD_JOIN_REQUEST_CREATE", guildJoinRequestListener);
};

export default { addListeners, removeListeners };
