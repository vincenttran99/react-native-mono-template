import { apiService } from "../api";

export type LoginPayload = {
  email?: string;
  password?: string;
};

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_at: string;
}

export const authApi = {
  /**
   * Login
   * @param payload
   * @returns
   */
  login: async (payload: LoginPayload) => {
    return apiService.post<LoginResponse>("/login", payload);
  },

  logout: async () => {
    return await apiService.get("/logout");
  },
};
