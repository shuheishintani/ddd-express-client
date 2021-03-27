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

  const handleAuthResponse = (data: AuthResponse) => {
    const { token, user } = data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  const register = async (userInput: UserInput) => {
    const { data } = await axios.post("/auth/register", userInput);
    handleAuthResponse(data);
    router.push("/");
  };

  const login = async (userInput: UserInput) => {
    const { data } = await axios.post("/auth/login", userInput);
    console.log(data);
    handleAuthResponse(data);
    await wait(1);
    router.push("/");
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    await wait(1);
    router.push("/login");
  };

  return { user, loading, register, login, logout };
};
