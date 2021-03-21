import { customAxios } from "@/utils/customAxios";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (taskId: number) => customAxios.delete(`/api/tasks/${taskId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );
};
