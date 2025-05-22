import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { profileApi } from "./profile.api";
import { IProfile } from "@/models/user.model";
import { useAuthStore } from "@/store/auth.store";
import { useProfileStore } from "@/store/profile.store";
import { INSTANCE_KEY, PERSIST_KEY } from "@/api/reactQuery";

// use PERSIST_KEY if you want to keep data in local storage
// use INSTANCE_KEY if you want to clear cache and local storage (ex: clear when user logout)
export const RQKEY_ROOT = "profile";
export const profileQueryKeys = {
  myProfile: [INSTANCE_KEY, PERSIST_KEY, RQKEY_ROOT, "my-profile"] as const,
  profile: (userId: string) => [RQKEY_ROOT, userId] as const,
};

const fakeGetMyProfileProcess = () => {
  return new Promise<IProfile>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        display_name: "Vincent Tran",
      });
    }, 500);
  });
};

export const useMyProfileQuery = () => {
  const setProfile = useProfileStore.getState().setProfile;

  return useQuery<IProfile, AxiosError>({
    queryFn: async () => {
      // let response = await profileApi.getMyProfile();
      let response = await fakeGetMyProfileProcess();
      setProfile(response);
      return response;
    },
    queryKey: profileQueryKeys.myProfile,
    staleTime: 1000 * 60 * 10,
    enabled: useAuthStore.getState().isAuthenticated,
  });
};

export const useUpdateProfileMutation = () => {
  const setProfile = useProfileStore.getState().setProfile;
  const queryClient = useQueryClient();

  return useMutation<IProfile, AxiosError, IProfile>({
    mutationFn: profileApi.getMyProfile,
    onSuccess: (data) => {
      setProfile(data);
      queryClient.setQueryData<IProfile>(["my-profile"], data);
    },
  });
};
