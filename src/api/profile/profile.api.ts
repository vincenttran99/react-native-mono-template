import { apiService } from "../api";
import { IProfile } from "@/models/user.model";

export const profileApi = {
  getMyProfile: async () => {
    return await apiService.get<IProfile>("/user");
  },

  updateProfile: async (payload: IProfile) => {
    return await apiService.patch<IProfile>("/user", payload);
  },
};
