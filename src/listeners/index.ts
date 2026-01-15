import { PluginLogger } from "@this";
import Modules from "@lib/RequiredModules";

const ListenerNames = ["GuildCreate", "GuildJoinRequest"] as const;

export const addListeners = async (): Promise<void> => {
  try {
    await Modules.loadModules();
    console.log(Modules);
    await Promise.all(
      ListenerNames.map(async (name) => {
        const mod = await import(`./${name}.ts`);
        mod.subscribe();
      }),
    );
  } catch (err: unknown) {
    PluginLogger.error(err);
  }
};

export const removeListeners = async (): Promise<void> => {
  try {
    await Promise.all(
      ListenerNames.map(async (name) => {
        const mod = await import(`./${name}.ts`);
        mod.unsubscribe();
      }),
    );
  } catch (err: unknown) {
    PluginLogger.error(err);
  }
};

export default { addListeners, removeListeners };
