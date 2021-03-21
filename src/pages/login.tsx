import { useLoginUser } from "@/hooks/useLoginUser";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {}

const Login: NextPage<Props> = () => {
  const { handleSubmit, errors, register, formState } = useForm();
  const loginUser = useLoginUser();

  return (
    <>
      <p>Login</p>
      <form onSubmit={handleSubmit(loginUser)}>
        <FormControl isInvalid={errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input name="username" placeholder="username" ref={register()} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input name="password" placeholder="password" ref={register()} />
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
          Submit
        </Button>
      </form>
    </>
  );
};

export default Login;
