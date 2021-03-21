import { customAxios } from "@/utils/customAxios";
import { useQuery } from "react-query";

export const useTasksQuery = () => {
  return useQuery("tasks", async () => {
    const { data } = await customAxios.get("/api/tasks");
    return data;
  });
};
