import { fluxDispatcher as FluxDispatcher } from "replugged/common";
import GuildCreateListener from "./GuildCreateListener";
import GuildJoinRequestListener from "./GuildJoinRequestListener";
export const addListeners = (): void => {
  FluxDispatcher.subscribe("GUILD_CREATE", GuildCreateListener);
  FluxDispatcher.subscribe("GUILD_JOIN_REQUEST_CREATE", GuildJoinRequestListener);
};
export const removeListeners = (): void => {
  FluxDispatcher.unsubscribe("GUILD_CREATE", GuildCreateListener);
  FluxDispatcher.unsubscribe("GUILD_JOIN_REQUEST_CREATE", GuildJoinRequestListener);
};

export default { addListeners, removeListeners };
