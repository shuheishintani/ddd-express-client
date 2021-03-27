import { AuthContext } from "@/pages/_app";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";

export const useAxios = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers = Object.assign(
      { Authorization: `Bearer ${token}` },
      config.headers
    );
    return config;
  });
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error) {
        setUser(null);
        router.push("/login");
      }
      return error;
    }
  );

  return { axios };
};
