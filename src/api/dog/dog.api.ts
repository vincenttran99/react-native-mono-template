import { CONFIG } from "@/constants/config.constant";
import { IDog } from "@/models/dog.model";
import { apiService } from "../api";
export type GetDogsParams = {
  page?: number;
  limit?: number;
};

export const dogApi = {
  getDogs: async (payload: GetDogsParams) => {
    return apiService.get<IDog[]>(`https://api.thedogapi.com/v1/breeds`, {
      params: payload,
      headers: {
        "x-api-key": CONFIG.DOG_API_KEY ?? "",
      },
    });
  },
};
