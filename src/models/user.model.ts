export enum EUserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface IProfile {
  user_id?: string;
  display_name?: string;
  role?: EUserRole;
}
