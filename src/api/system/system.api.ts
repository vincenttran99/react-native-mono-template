import { apiService } from "../api";
import { ISystemSettings } from "models/system.model";

export const systemApi = {
  getSystemSettings: async () => {
    return apiService.get<ISystemSettings>("/settings");
  },
};
