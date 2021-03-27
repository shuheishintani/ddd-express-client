import { UserForm } from "@/components/UserForm";
import { useAuth } from "@/hooks/useAuth";
import { NextPage } from "next";
import React from "react";

interface Props {}

const Login: NextPage<Props> = () => {
  const { login } = useAuth();
  return <UserForm action="ログイン" mutation={login} />;
};

export default Login;
