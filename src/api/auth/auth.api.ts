import { apiService } from "../api";

/**
 * Type definition for login request payload
 * Contains optional email and password fields that will be sent to the server
 * Fields are optional to support different authentication methods
 */
export type LoginPayload = {
  email?: string;
  password?: string;
};

/**
 * Interface defining the structure of the login response from the server
 * Contains authentication tokens and expiration information
 * - access_token: JWT token for API authorization
 * - refresh_token: Token used to get a new access token when it expires
 * - expires_at: Timestamp indicating when the access token will expire
 */
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_at: string;
}

/**
 * Authentication API module
 * Contains methods for handling authentication-related API requests
 */
export const authApi = {
  /**
   * Authenticates a user with the provided credentials
   * Makes a POST request to the login endpoint with email and password
   *
   * @param payload - Object containing user credentials (email and password)
   * @returns Promise resolving to LoginResponse containing authentication tokens
   */
  login: async (payload: LoginPayload) => {
    return apiService.post<LoginResponse>("/login", payload);
  },

  /**
   * Logs out the current user
   * Makes a GET request to the logout endpoint to invalidate the current session
   *
   * @returns Promise resolving to the server response
   */
  logout: async () => {
    return await apiService.get("/logout");
  },
};
