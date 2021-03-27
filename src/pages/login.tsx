import { UserForm } from "@/components/UserForm";
import { useAuth } from "@/hooks/useAuth";
import { NextPage } from "next";
import React from "react";

interface Props {}

const Login: NextPage<Props> = () => {
  const { login, statusCode } = useAuth();
  return (
    <UserForm action="ログイン" mutation={login} statusCode={statusCode} />
  );
};

export default Login;
