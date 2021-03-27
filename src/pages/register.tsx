import { UserForm } from "@/components/UserForm";
import { useAuth } from "@/hooks/useAuth";
import { NextPage } from "next";
import React from "react";

interface Props {}

const Register: NextPage<Props> = () => {
  const { register, statusCode } = useAuth();
  console.log(statusCode);
  return (
    <UserForm action="新規登録" mutation={register} statusCode={statusCode} />
  );
};

export default Register;
