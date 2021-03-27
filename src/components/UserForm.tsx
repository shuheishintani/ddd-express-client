import { UserInput } from "@/dto/UserInput";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  mutation: (userInput: UserInput) => void;
  action: string;
  statusCode?: number | null;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required("ユーザー名を入力してください。")
    .matches(/^[a-zA-Z0-9]+$/, "半角英数字のみ有効です。")
    .max(20, "ユーザー名は最大20文字です。"),
  password: yup
    .string()
    .required("パスワードを入力してください。")
    .matches(/^[a-zA-Z0-9]+$/, "半角英数字のみ有効です。")
    .min(8, "パスワードは最低8文字以上必要です。"),
});

export const UserForm: React.FC<Props> = ({ mutation, action, statusCode }) => {
  const { handleSubmit, errors, register, formState } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(mutation)}>
      <FormControl isInvalid={errors.username}>
        <FormLabel htmlFor="username">ユーザー名</FormLabel>
        <Input name="username" placeholder="ユーザー名" ref={register()} />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
        {statusCode === 409 && (
          <Text color="red.300" fontSize="sm" mt={1}>
            すでに存在するユーザーです。
          </Text>
        )}
      </FormControl>
      <FormControl isInvalid={errors.password} mt={4}>
        <FormLabel htmlFor="password">パスワード</FormLabel>
        <Input name="password" placeholder="パスワード" ref={register()} />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
        {statusCode === 401 && (
          <Text color="red.300" fontSize="sm" mt={1}>
            パスワードが間違っています。
          </Text>
        )}
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
