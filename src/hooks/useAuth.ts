import { UserInput } from "@/dto/UserInput";
import { AuthResponse } from "@/fragments/AuthResponse";
import { ErrorResponse } from "@/fragments/ErrorResponse";
import { AuthContext } from "@/pages/_app";
import { wait } from "@/utils/wait";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useAxios } from "./useAxios";

export const useAuth = () => {
  const router = useRouter();
  const { axios } = useAxios();
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      if (!user && !loading) {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await axios.get("/users/me");
          setUser(data);
        }
      }
      setLoading(false);
    })();
  }, []);

  const handleResponse = async (data: AuthResponse | ErrorResponse) => {
    if (data.hasOwnProperty("error")) {
      const errorData = data as ErrorResponse;
      setStatusCode(errorData.error.status);
      return;
    }
    const { token, user } = data as AuthResponse;
    localStorage.setItem("token", token);
    await wait(1);
    setUser(user);
    router.push("/");
  };

  const register = async (userInput: UserInput) => {
    const { data } = await axios.post("/auth/register", userInput);
    await handleResponse(data);
  };

  const login = async (userInput: UserInput) => {
    const { data } = await axios.post("/auth/login", userInput);
    await handleResponse(data);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    await wait(1);
    setUser(null);
    router.push("/login");
  };

  return { user, loading, register, login, logout, statusCode };
};
