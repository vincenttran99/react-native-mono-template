import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "store";
import { IProfile } from "models/user.model";
import { useProfileStore } from "./profile.store";
import { setTokenHelper } from "helpers/storage.helper";

interface IAuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;

  token?: string;
  setToken: (token: string) => void;

  logout: () => void;

  updateState: (value: object) => void;
  reset: () => void;
}

const initState = {
  isAuthenticated: false,
  token: undefined,
};

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      ...initState,
      setIsAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },
      setToken: (token: string) => {
        set({ token });
      },

      updateState: (value: object) => {
        set((state) => ({
          ...state,
          ...value,
        }));
      },

      logout: () => {
        set(initState);

        // Reset other stores
        useProfileStore.getState().reset();

        // Xóa token trong storage
        setTokenHelper("");
      },

      reset: () => {
        set(initState);
      },
    }),
    {
      name: "default-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
