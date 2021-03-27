import { UserInput } from "@/dto/UserInput";
import { AuthResponse } from "@/fragments/AuthResponse";
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

  useEffect(() => {
    (async () => {
      if (!user) {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await axios.get("/users/me");
          setUser(data);
        }
      }
      setLoading(false);
    })();
  }, []);

  const handleAuthResponse = async (data: AuthResponse) => {
    const { token, user } = data;
    localStorage.setItem("token", token);
    await wait(1);
    setUser(user);
  };

  const register = async (userInput: UserInput) => {
    const { data } = await axios.post("/auth/register", userInput);
    await handleAuthResponse(data);
    router.push("/");
  };

  const login = async (userInput: UserInput) => {
    const { data } = await axios.post("/auth/login", userInput);
    await handleAuthResponse(data);
    router.push("/");
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    await wait(1);
    setUser(null);
    router.push("/login");
  };

  return { user, loading, register, login, logout };
};
