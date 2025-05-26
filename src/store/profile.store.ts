import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/store";
import { IProfile } from "@/models/user.model";

interface IAuthStore {
  profile?: IProfile;
  setProfile: (profile: IProfile) => void;

  updateState: (value: object) => void;
  reset: () => void;
}

const initState = {
  profile: undefined,
};

export const useProfileStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      ...initState,
      setProfile: (profile: IProfile) => {
        set({ profile });
      },

      updateState: (value: object) => {
        set((state) => ({
          ...state,
          ...value,
        }));
      },
      reset: () => {
        set(initState);
      },
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
