import { customAxios } from "@/utils/customAxios";
import { useRouter } from "next/router";

export const useRegisterUser = () => {
  const router = useRouter();
  const registerUser = async (userInput: {
    username: string;
    password: string;
  }) => {
    const { data } = await customAxios.post("/api/auth/register", userInput);
    localStorage.setItem("token", data);
    router.push("/tasks");
  };
  return registerUser;
};
