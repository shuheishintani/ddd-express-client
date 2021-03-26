import { TaskInput } from "@/dto/TaskInput";
import { Task } from "@/entities/Task";
import { wait } from "@/utils/wait";
import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { axios } = useAxios();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setLoading(true);
        const { data } = await axios.get("/tasks");
        setTasks(data);
        setLoading(false);
      }
    })();
  }, []);

  const createTask = async (taskInput: TaskInput) => {
    await wait(1);
    const { data } = await axios.post("/tasks", taskInput);
    setTasks((prev) => [...prev, data]);
  };

  const updateTask = async (
    taskId: number,
    taskUpdate: Partial<Task>
  ): Promise<void> => {
    await wait(1);
    const { data } = await axios.post(`/tasks/${taskId}`, taskUpdate);
    if (data) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, ...taskUpdate } : task
        )
      );
    }
  };

  const deleteTask = async (taskId: number): Promise<void> => {
    const { data } = await axios.delete(`/tasks/${taskId}`);
    if (data) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  return { tasks, loading, createTask, updateTask, deleteTask };
};
