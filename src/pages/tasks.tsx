import { useCreateTaskMutation } from "@/hooks/useCreateTaskMutation";
import { useDeleteTaskMutation } from "@/hooks/useDeleteTaskMutation";
import { useTasksQuery } from "@/hooks/useTasksQuery";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {}

const Tasks: NextPage<Props> = () => {
  const { data } = useTasksQuery();
  const createTask = useCreateTaskMutation();
  const deleteTask = useDeleteTaskMutation();
  const { handleSubmit, errors, register, formState } = useForm();
  const onSubmit = async (taskInput: { title: string }) => {
    createTask.mutate(taskInput);
  };
  console.log(data);

  return (
    <>
      <UnorderedList>
        {data &&
          data.map((task: any) => (
            <Flex key={task.id}>
              <ListItem>{task.title}</ListItem>
              <CloseButton
                size="sm"
                colorScheme="gray"
                onClick={() => deleteTask.mutate(task.id)}
              />
            </Flex>
          ))}
      </UnorderedList>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.title}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input name="title" placeholder="title" ref={register()} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};
export default Tasks;
