import { customAxios } from "@/utils/customAxios";
import { useMutation, useQueryClient } from "react-query";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (taskInput: { title: string }) => customAxios.post("/api/tasks", taskInput),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );
};
