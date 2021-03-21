import { customAxios } from "@/utils/customAxios";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const loginUser = async (userInput: {
    username: string;
    password: string;
  }) => {
    const { data } = await customAxios.post("/api/auth/login", userInput);
    localStorage.setItem("token", data);
    queryClient.invalidateQueries("me");
    router.push("/");
  };
  return loginUser;
};
