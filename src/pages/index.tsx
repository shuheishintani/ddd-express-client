import { ModalTaskForm } from "@/components/ModalTaskForm";
import { TodoItem } from "@/components/TodoItem";
import { TaskInput } from "@/dto/TaskInput";
import { Task } from "@/entities/Task";
import { useTasks } from "@/hooks/useTasks";
import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Select,
  Spacer,
  Spinner,
  Stack,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

interface Props {}

const Tasks: NextPage<Props> = () => {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();
  const { user, loading } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filter, setFilter] = useState<string>("all");
  const router = useRouter();

  const handleCreateTask = async (taskInput: TaskInput) => {
    await createTask(taskInput);
    onClose();
    toast({
      title: "Todoを新規作成しました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("login");
    }
  }, [loading, user]);

  console.log(user);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const condition = (task: Task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "done") {
      return task.done === true;
    } else if (filter === "undone") {
      return task.done === false;
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {user && (
        <>
          <Flex align="center">
            <Select value={filter} onChange={handleSelect} mr={4}>
              <option value="all">すべてのTodo</option>
              <option value="undone">未完了のTodo</option>
              <option value="done">完了済みのTodo</option>
            </Select>
            <Spacer />
            <IconButton
              colorScheme="teal"
              aria-label="Add Todo"
              icon={<AddIcon />}
              size="lg"
              borderRadius="full"
              onClick={onOpen}
            />
          </Flex>
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
                    <TodoItem
                      key={task.id}
                      task={task}
                      updateTask={updateTask}
                      deleteTask={deleteTask}
                    />
                  ))}
            </Stack>
          </UnorderedList>
          <ModalTaskForm
            isOpen={isOpen}
            onClose={onClose}
            mutation={handleCreateTask}
            action="追加"
          />
        </>
      )}
    </>
  );
};

export default Tasks;
