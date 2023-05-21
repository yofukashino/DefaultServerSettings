import { common } from "replugged";
import { guildCreateListener } from "./guildCreateListener";
import { guildJoinRequestListener } from "./guildJoinRequestListener";
const { fluxDispatcher: FluxDispatcher } = common;
export const addListeners = (): void => {
  FluxDispatcher.subscribe("GUILD_CREATE", guildCreateListener);
  FluxDispatcher.subscribe("GUILD_JOIN_REQUEST_CREATE", guildJoinRequestListener);
};
export const removeListeners = (): void => {
  FluxDispatcher.unsubscribe("GUILD_CREATE", guildCreateListener);
  FluxDispatcher.unsubscribe("GUILD_JOIN_REQUEST_CREATE", guildJoinRequestListener);
};
