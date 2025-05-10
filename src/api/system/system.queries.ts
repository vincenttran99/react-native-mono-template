import { useQuery } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { ISystemSettings } from "models/system.model";
import { systemApi } from "./system.api";
import { PERSIST_KEY } from "api/reactQuery";
import { useSystemStore } from "store/system.store";

// use PERSIST_KEY if you want to keep data in local storage
// use INSTANCE_KEY if you want to clear cache and local storage (ex: clear when user logout)
export const RQKEY_ROOT = "system";
export const systemQueryKeys = {
  systemSettings: [PERSIST_KEY, RQKEY_ROOT, "getSystemSettings"],
};

const fakeGetSystemSettingsProcess = () => {
  return new Promise<ISystemSettings>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        maintenance_mode: "0",
        // etc...
      });
    }, 500);
  });
};

export const useGetSystemSettingsQuery = () => {
  return useQuery<ISystemSettings, AxiosError>({
    queryFn: async () => {
      // const data = await systemApi.getSystemSettings();
      const data = await fakeGetSystemSettingsProcess();
      const updateState = useSystemStore.getState().updateState;
      /**
       * When you have to update something in store, you can use updateState
       * Look at this, I don't want "maintenanceMode" in cache each time I open app
       * Ignore "maintenanceMode" in zustand store easier than react query
       * We don't want some days we have to shut down the app and "maintenanceMode" is false and then becomes true (bad experience)
       */
      updateState({
        maintenanceMode: data?.maintenance_mode == "1",
      });
      return data;
    },
    queryKey: systemQueryKeys.systemSettings,
    staleTime: 1000 * 60 * 60 * 3,
  });
};
