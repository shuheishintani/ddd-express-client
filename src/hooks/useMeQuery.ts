import { customAxios } from "@/utils/customAxios";
import { useQuery } from "react-query";

export const useMeQuery = () => {
  return useQuery("me", async () => {
    const { data } = await customAxios.get("/api/users/me");
    return data;
  });
};
