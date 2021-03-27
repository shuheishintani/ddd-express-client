import { Task } from "@/entities/Task";
import { useTasks } from "@/hooks/useTasks";
import { UnorderedList, Stack } from "@chakra-ui/react";
import React from "react";
import { TaskItem } from "./TaskItem";

interface Props {
  tasks: Task[];
  updateTask: (taskId: number, taskUpdate: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  condition: (task: Task) => void;
}

export const TaskList: React.FC<Props> = ({
  tasks,
  updateTask,
  deleteTask,
  condition,
}) => {
  return (
    <UnorderedList mt={4}>
      <Stack spacing={8}>
        {tasks &&
          tasks
            .filter((task) => condition(task))
            .sort(
              (task1, task2) =>
                new Date(task2.created_at).getTime() -
                new Date(task1.created_at).getTime()
            )
            .map((task: Task) => (
              <TaskItem
                key={task.id}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))}
      </Stack>
    </UnorderedList>
  );
};
