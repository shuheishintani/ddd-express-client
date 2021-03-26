import { UserViewModel } from "./UserViewModel";

export interface AuthResponse {
  token: string;
  user: UserViewModel;
}
