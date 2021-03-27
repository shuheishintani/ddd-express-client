import { UserInput } from "@/dto/UserInput";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  mutation: (userInput: UserInput) => void;
  action: string;
}

export const UserForm: React.FC<Props> = ({ mutation, action }) => {
  const { handleSubmit, errors, register: formRegister, formState } = useForm();
  return (
    <form onSubmit={handleSubmit(mutation)}>
      <FormControl isInvalid={errors.username}>
        <FormLabel htmlFor="username">ユーザー名</FormLabel>
        <Input name="username" placeholder="ユーザー名" ref={formRegister()} />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password} mt={4}>
        <FormLabel htmlFor="password">パスワード</FormLabel>
        <Input name="password" placeholder="パスワード" ref={formRegister()} />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        isLoading={formState.isSubmitting}
        type="submit"
      >
        {action}
      </Button>
    </form>
  );
};
