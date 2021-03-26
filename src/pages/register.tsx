import { UserInput } from "@/dto/UserInput";
import { useAuth } from "@/hooks/useAuth";
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

const Register: NextPage<Props> = () => {
  const { handleSubmit, errors, register: formRegister, formState } = useForm();
  const { register } = useAuth();
  return (
    <>
      <p>Register</p>
      <form onSubmit={handleSubmit(register)}>
        <FormControl isInvalid={errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input name="username" placeholder="username" ref={formRegister()} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input name="password" placeholder="password" ref={formRegister()} />
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

export default Register;
