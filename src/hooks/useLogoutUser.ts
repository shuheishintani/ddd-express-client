import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const logoutUser = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries("me");
    router.push("/tasks");
  };
  return logoutUser;
};
