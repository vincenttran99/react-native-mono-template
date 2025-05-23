import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/store";

interface ISystemStore {
  isFirstOpen: boolean;
  setIsFirstOpen: (isFirtOpen: boolean) => void;

  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  appLanguage: string;
  setAppLanguage: (appLanguage: string) => void;

  maintenanceMode: boolean;

  updateState: (value: object) => void;
}

const initialState = {
  theme: "light" as const,
  appLanguage: "en",
  maintenanceMode: false,
  isFirstOpen: true,
};

export const useSystemStore = create<ISystemStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setIsFirstOpen: (isFirtOpen: boolean) => {
        set({ isFirstOpen: isFirtOpen });
      },
      setTheme: (theme: "light" | "dark") => {
        set({ theme });
      },
      setAppLanguage: (appLanguage: string) => {
        set({ appLanguage });
      },

      updateState: (value: object) => {
        set((state) => ({
          ...state,
          ...value,
        }));
      },
    }),
    {
      name: "default-storage",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => {
        // Exclude 'maintenanceMode' from persisted state
        const { maintenanceMode, ...persistedState } = state;
        return persistedState;
      },
    }
  )
);
