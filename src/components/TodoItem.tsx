import { TaskInput } from "@/dto/TaskInput";
import { Task } from "@/entities/Task";
import { useMoment } from "@/hooks/useMoment";
import { wait } from "@/utils/wait";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ModalTaskForm } from "./ModalTaskForm";

interface Props {
  task: Task;
  updateTask: (taskId: number, taskUpdate: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
}

export const TodoItem: React.FC<Props> = ({
  task: { id, title, description, done, created_at },
  updateTask,
  deleteTask,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { moment } = useMoment();

  console.log(new Date(created_at).getTime());

  const handleDelete = async (taskId: number) => {
    setIsDeleting(true);
    await wait(1);
    deleteTask(taskId);
  };

  const doneTask = async (taskId: number) => {
    setIsUpdating(true);
    await updateTask(taskId, { done: !done });
    setIsUpdating(false);
  };

  const updateThisTask = async (taskInput: TaskInput) => {
    await updateTask(id, taskInput);
    onClose();
    toast({
      title: "編集内容を保存しました.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="base">
      <Flex align="center">
        {isUpdating ? (
          <Spinner size="sm" color="gray.400" />
        ) : (
          <Checkbox
            colorScheme="green"
            isChecked={done}
            onClick={() => doneTask(id)}
          />
        )}

        <Heading fontSize="xl" mx={4}>
          {title}
        </Heading>
        <Text fontSize="sm">作成日時 : {moment(created_at).format("lll")}</Text>
        <Spacer />
        <IconButton
          aria-label="DeleteIcon"
          icon={<EditIcon />}
          onClick={onOpen}
        />
        <IconButton
          aria-label="DeleteIcon"
          icon={<DeleteIcon />}
          onClick={() => handleDelete(id)}
          isLoading={isDeleting}
        />
      </Flex>
      <Text mt={4}>{description}</Text>
      <ModalTaskForm
        isOpen={isOpen}
        onClose={onClose}
        mutation={updateThisTask}
        defaultValues={[title, description]}
        action="編集"
      />
    </Box>
  );
};
